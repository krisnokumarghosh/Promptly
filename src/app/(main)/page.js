import Banner from "@/components/homepage/Banner";
import BuiltForNextEra from "@/components/homepage/BuiltForNextEra";
import CTABanner from "@/components/homepage/CTABanner";
import EngineeredForEveryModel from "@/components/homepage/EngineeredForEveryModel";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
   <div>
    <Banner/>
    <WhyChooseUs/>
    <BuiltForNextEra/>
    <EngineeredForEveryModel/>
    <CTABanner/>
   </div>
  );
}
