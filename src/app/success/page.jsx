import { submitPayment } from "@/lib/actions/payments";
import { jetbrainsMono } from "@/lib/fonts";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail, name: customerName },
    amount_total,
    currency,
    metadata,
    payment_intent: {
      payment_method: {
        card: { brand, last4, exp_month, exp_year },
      },
    },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent", "payment_intent.payment_method"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const paymentInfo = {
      userEmail: customerEmail,
      userId: metadata.userId,
      userName: metadata.userName,
      cardHolderName: customerName,
      plan: "Pro",
      cardBrand: brand,
      cardLast4: last4,
      amount: amount_total / 100,
      currency: currency?.toUpperCase(),
    };
    const submit = await submitPayment(paymentInfo);
    return (
      <section id="success">
        <div className="min-h-screen bg-[#080d08] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,rgba(100,200,50,0.09),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 text-center max-w-md w-full">
            <div className="w-20 h-20 rounded-[20px] bg-[#AAFF00]/8 border border-[#AAFF00]/20 flex items-center justify-center mx-auto mb-6">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#AAFF00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 13 4 9" />
              </svg>
            </div>

            <div
              className={`${jetbrainsMono.className} inline-flex items-center gap-2 bg-[#AAFF00]/8 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full mb-5`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
              Payment Successful
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold text-white tracking-tight mb-3">
              You&apos;re now a{" "}
              <span className="text-[#AAFF00]">Pro Member</span>
            </h1>

            <p className="text-[14px] text-white/40 leading-[1.7] mb-3">
              Welcome to the neural elite. Your premium access is now active —
              unlock every prompt, every model, every feature.
            </p>

            <div
              className={`${jetbrainsMono.className} bg-[#0d120d] border border-white/[0.07] rounded-[14px] overflow-hidden mb-8 text-left`}
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="px-5 py-4 text-[12px] leading-[1.9]">
                <p className="text-[#AAFF00]/35 text-[10px] tracking-widest mb-2">
                  — TRANSACTION CONFIRMED —
                </p>
                <div className="flex gap-2">
                  <span className="text-white/35">Status:</span>
                  <span className="text-[#AAFF00]">COMPLETE ✓</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white/35">Email:</span>
                  <span className="text-white/70">{customerEmail}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white/35">Plan:</span>
                  <span className="text-white/70">Promptly Pro</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white/35">Access:</span>
                  <span className="text-white/70">Unlimited</span>
                </div>
                <p className="text-[#AAFF00] font-bold mt-3 flex items-center gap-1">
                  {"> READY FOR DEPLOYMENT"}
                  <span className="inline-block w-2 h-3.5 bg-[#AAFF00] animate-pulse ml-0.5" />
                </p>
              </div>
            </div>

            <p className="text-[12px] text-white/25 mb-8 leading-[1.7]">
              A confirmation email has been sent to{" "}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/all-prompts"
                className="bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[13px] px-6 py-2.5 rounded-full transition-colors"
              >
                Explore Prompts →
              </Link>
              <Link
                href="/dashboard/user"
                className="bg-white/4 hover:bg-white/8 border border-white/8 text-white/60 hover:text-white text-[13px] font-medium px-6 py-2.5 rounded-full transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
