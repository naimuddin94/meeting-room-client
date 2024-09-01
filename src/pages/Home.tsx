import Banner from "@/components/custom/home/Banner";
import CustomerReviews from "@/components/custom/home/CustomerReviews";
import FeatureBrands from "@/components/custom/home/FeatureBrands";
import HomeProduct from "@/components/custom/home/HomeProduct";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeProduct />
      <FeatureBrands />
      <CustomerReviews />
    </div>
  );
};

export default Home;
