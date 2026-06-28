import UserReviewsList from "@/components/dashboard/user/UserReviewsList";
import { getReviewsByUserId } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";

const UserMyReviewPage = async () => {
  const user = await getUserSession();
  const reviews = await getReviewsByUserId(user?.id);

  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          MY ACTIVITY
        </p>
        <h2 className="text-[22px] md:text-[30px] font-bold">My Reviews</h2>
        <p className="text-[13px] text-white/35 mt-1">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
      </div>
      <UserReviewsList reviews={reviews} />
    </div>
  );
};

export default UserMyReviewPage;
