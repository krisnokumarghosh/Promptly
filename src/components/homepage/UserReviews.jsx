"use client";

import Image from "next/image";
import { jetbrainsMono } from "@/lib/fonts";
import { Star } from "@gravity-ui/icons";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          width={12}
          height={12}
          className={s <= rating ? "text-[#AAFF00]" : "text-white/15"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="mx-3 w-75 h-37.5 flex flex-col gap-3 bg-[#0d120d] border border-white/[0.07] hover:border-[#AAFF00]/20 rounded-[14px] p-5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-none border border-white/8">
            {review.userImage ? (
              <Image
                src={review.userImage}
                alt={review.userName}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`${jetbrainsMono.className} w-full h-full bg-[#AAFF00]/10 flex items-center justify-center text-[#AAFF00] text-[11px] font-bold`}
              >
                {review.userName?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <p className="text-[13px] font-semibold text-white/75">
            {review.userName}
          </p>
        </div>
        <StarDisplay rating={review.rating} />
      </div>

      <p className="text-[12.5px] text-white/40 leading-[1.75] line-clamp-4">
        {review.userReview}
      </p>
    </div>
  );
}

export default function UserReviews({ reviews = [] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-[#080d08] py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#AAFF00]/8 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
          Community Reviews
        </div>
        <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold text-white tracking-tight leading-[1.2] mb-3">
          Loved by <span className="text-[#AAFF00]">Prompt Engineers</span>
        </h2>
        <p className="text-[14px] text-white/40 max-w-100 mx-auto leading-[1.7]">
          See what our community is saying about their experience with
          Prompt.Lab
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#080d08] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#080d08] to-transparent z-10 pointer-events-none" />
        <Marquee speed={35} gradient={false} pauseOnHover>
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review._id}-${i}`} review={review} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
