import CustomerReviews from "@/components/custom/home/CustomerReviews";
import FeatureBrands from "@/components/custom/home/FeatureBrands";
import Hero from "@/components/custom/home/Hero";
import HomeProduct from "@/components/custom/home/HomeProduct";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeProduct />
      <FeatureBrands />
      <CustomerReviews/>
    </div>
  );
};

export default Home;
