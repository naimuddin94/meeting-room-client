import Banner from "@/components/custom/home/Banner";
import CustomerReviews from "@/components/custom/home/CustomerReviews";
import FeatureRooms from "@/components/custom/home/FeatureRooms";
import ServiceAdvertisement from "@/components/custom/home/ServiceAdvertisement";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureRooms />
      <ServiceAdvertisement />
      <CustomerReviews />
    </div>
  );
};

export default Home;
