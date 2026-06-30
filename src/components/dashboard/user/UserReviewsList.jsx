import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/fonts";
import { Star } from "@gravity-ui/icons";

function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          width={13}
          height={13}
          className={s <= rating ? "text-[#AAFF00]" : "text-white/15"}
        />
      ))}
    </div>
  );
}

export default function UserReviewsList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-[#0d120d] border border-white/[0.07] rounded-4xl">
        <div className="w-14 h-14 rounded-[14px] bg-[#AAFF00]/6 border border-[#AAFF00]/15 flex items-center justify-center">
          <Star width={24} height={24} className="text-[#AAFF00]/40" />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-semibold text-white/50 mb-1">
            No reviews yet
          </p>
          <p className={`${jetbrainsMono.className} text-[11px] text-white/20 tracking-[0.06em]`}>
            Try some prompts and share your experience
          </p>
        </div>
        <Link
          href="/all-prompts"
          className="mt-1 bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[12px] px-5 py-2.5 rounded-full transition-colors"
        >
          Explore Prompts →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="flex flex-col gap-3 bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-none border border-white/8">
                {review.userImage ? (
                  <Image
                    src={review.userImage}
                    alt={review.userName}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`${jetbrainsMono.className} w-full h-full bg-[#AAFF00]/10 flex items-center justify-center text-[#AAFF00] text-[13px] font-bold`}>
                    {review.userName?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/80">
                  {review.userName}
                </p>
                <p className={`${jetbrainsMono.className} text-[10px] text-white/25 mt-0.5`}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <StarDisplay rating={review.rating} />
          </div>

          <p className="text-[13px] text-white/50 leading-[1.75]">
            {review.userReview}
          </p>

          <Link
            href={`/all-prompts/${review.promptId}`}
            className={`${jetbrainsMono.className} self-start text-[10px] text-[#AAFF00]/50 hover:text-[#AAFF00] tracking-[0.08em] uppercase border border-[#AAFF00]/15 hover:border-[#AAFF00]/30 px-3 py-1 rounded-full transition-colors`}
          >
            View Prompt →
          </Link>
        </div>
      ))}
    </div>
  );
}