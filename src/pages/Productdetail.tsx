import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import PaginationComponent from "@/components/shared/PaginationComponent";
import Rating from "@/components/shared/Rating";
import ReviewCard from "@/components/shared/ReviewCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useFetchSingleProductQuery } from "@/redux/api/productApi";
import { useFetchRatingsByProductIdQuery } from "@/redux/api/ratingApi";
import { currentToken, currentUser } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TRating } from "@/Types";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchSingleProductQuery(id);
  const { data: ratingData, isLoading: ratingLoading } =
    useFetchRatingsByProductIdQuery({
      id,
      param: { page, limit: 2, sort: "-updatedAt" },
    });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading || ratingLoading) {
    return <Loader size={200} />;
  }

  const {
    _id,
    name,
    brand,
    image,
    description,
    price,
    rating,
    stock,
    material,
    weight,
  } = data.data;

  const handleAddToCart = () => {
    if (!token) {
      return navigate("/login");
    }
    dispatch(addToCart({ _id, image, name, price, stock, quantity: 1 }));
    toast({
      title: "Add to cart successfully",
    });
  };

  return (
    <Container className="py-8 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={image}
            alt="Product Image"
            className="w-full rounded-lg object-cover aspect-[4/3]"
          />
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="mt-1.5 flex items-center gap-2">
                <Rating rating={rating} />
                <p className="text-muted-foreground text-lg">
                  {ratingData?.data?.meta?.total}
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">$ {price}</p>

            {user?.role == "admin" ? (
              <div className="space-x-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  variant="outline"
                  className="mt-4"
                >
                  Add to Cart
                </Button>
                <Link to={`/dashboard/edit-product/${_id}`}>
                  <Button size="lg" variant="secondary" className="mt-4">
                    Edit Product
                  </Button>
                </Link>
              </div>
            ) : (
              <Button size="lg" onClick={handleAddToCart} className="mt-4">
                Add to Cart
              </Button>
            )}
          </div>
          <Tabs defaultValue="specification">
            <TabsList className="border-b">
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="specification">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Product Specifications</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <p className="font-medium">Material</p>
                      <p className="text-muted-foreground">{material}</p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Weight</p>
                      <p className="text-muted-foreground">{weight}</p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Brand</p>
                      <p className="text-muted-foreground">{brand.name}</p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Origin</p>
                      <p className="text-muted-foreground">{brand.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="description">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Product Description</h2>
                  {description
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <div key={index}>
                        <p className="text-muted-foreground pb-5">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Customer Reviews</h2>
                  <div className="grid gap-6">
                    {ratingData?.data?.result?.length ? (
                      ratingData?.data?.result?.map((ratingInfo: TRating) => (
                        <ReviewCard
                          key={ratingInfo._id}
                          ratingInfo={ratingInfo}
                        />
                      ))
                    ) : (
                      <div>
                        <p>No review yet !</p>
                      </div>
                    )}
                  </div>
                  {ratingData?.data?.meta?.totalPage > 1 && (
                    <div className="flex justify-center mt-8">
                      <PaginationComponent
                        meta={ratingData?.data?.meta}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="questions">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Customer Questions</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <p className="font-medium">
                          Does this keyboard have RGB lighting?
                        </p>
                        <p className="text-muted-foreground">
                          Yes, many of our mechanical keyboards feature
                          customizable RGB lighting.
                        </p>
                      </div>
                      <div className="grid gap-1">
                        <p className="font-medium">
                          What is the warranty on this keyboard?
                        </p>
                        <p className="text-muted-foreground">
                          We offer a 1-year warranty on all our mechanical
                          keyboards, covering any manufacturing defects.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <p className="font-medium">
                          Can I customize the keycaps on this keyboard?
                        </p>
                        <p className="text-muted-foreground">
                          Absolutely! Our mechanical keyboards support standard
                          keycap sizes, making them compatible with most
                          aftermarket keycap sets.
                        </p>
                      </div>
                      <div className="grid gap-1">
                        <p className="font-medium">
                          Does this keyboard have programmable keys?
                        </p>
                        <p className="text-muted-foreground">
                          Yes, our keyboards come with software that allows you
                          to program keys and create custom macros.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
