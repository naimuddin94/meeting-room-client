import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import Loader from "@/components/shared/Loader";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useFetchProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/Types";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const { data, isLoading } = useFetchProductsQuery({
    page: 1,
    limit: 4,
    sort: "-rating",
  });

  if (isLoading) {
    return <Loader size={200} />;
  }
  return (
    <Container>
      <section className="space-y-8 my-8">
        <Heading>Top Keyboards</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.data?.result?.map((product: TProduct) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/products">
            <Button variant="outline" className="border-theme/30">
              Show All Products
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default HomeProduct;
