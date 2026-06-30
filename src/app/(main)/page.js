import Banner from "@/components/homepage/Banner";
import BuiltForNextEra from "@/components/homepage/BuiltForNextEra";
import CTABanner from "@/components/homepage/CTABanner";
import EngineeredForEveryModel from "@/components/homepage/EngineeredForEveryModel";
import FeaturedPromptsSection from "@/components/homepage/FeaturedPrompts";
import UserReviewsSection from "@/components/homepage/UserReviewsSection";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
   <div>
    <Banner/>
    <FeaturedPromptsSection/>
    <WhyChooseUs/>
    <BuiltForNextEra/>
    <EngineeredForEveryModel/>
    <UserReviewsSection/>
    <CTABanner/>
   </div>
  );
}
