import Banner from "@/components/custom/home/Banner";
import CustomerReviews from "@/components/custom/home/CustomerReviews";
import FeatureRooms from "@/components/custom/home/FeatureRooms";
import HowItWorks from "@/components/custom/home/HowItWork";
import ServiceAdvertisement from "@/components/custom/home/ServiceAdvertisement";
import WhyChooseUs from "@/components/custom/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureRooms />
      <ServiceAdvertisement />
      <CustomerReviews />
      <WhyChooseUs />
      <div className="w-full h-[1px] bg-muted-foreground/20"/>
      <HowItWorks />
    </div>
  );
};

export default Home;
