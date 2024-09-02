import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useFetchSingleRoomQuery } from "@/redux/api/roomApi";
import { currentToken, currentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";

function RoomDetails() {
  const { id } = useParams();
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: roomData, isLoading } = useFetchSingleRoomQuery(id as string, {
    skip: !id,
  });

  if (isLoading) {
    return <Loader size={200} />;
  }

  const handleAddToCart = () => {
    if (!token) {
      return navigate("/login");
    }
    // dispatch(addToCart({ _id, image, name, price, stock, quantity: 1 }));
    toast({
      title: "Add to cart successfully",
    });
  };

  return (
    <Container className="py-8 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={roomData?.data?.image}
            alt="Product Image"
            className="w-full rounded-lg object-cover aspect-[4/3]"
          />
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{roomData?.data?.name}</h1>
            </div>
            <p className="text-2xl font-bold text-primary">
              $ {roomData?.data?.pricePerSlot}
            </p>

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
                <Link to={`/dashboard/edit-room/${roomData?.data?._id}`}>
                  <Button size="lg" variant="secondary" className="mt-4">
                    Edit Room
                  </Button>
                </Link>
              </div>
            ) : (
              <Button size="lg" onClick={handleAddToCart} className="mt-4">
                Book Now
              </Button>
            )}
          </div>
          <Tabs defaultValue="specification">
            <TabsList className="border-b">
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="description">Features</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="specification">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Product Specifications</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <p className="font-medium">Room Number</p>
                      <p className="text-muted-foreground">
                        {roomData?.data?.roomNo}
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Floor Number</p>
                      <p className="text-muted-foreground">
                        {roomData?.data?.floorNo}
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Capacity</p>
                      <p className="text-muted-foreground">
                        {roomData?.data?.capacity}
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Anytown USA 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="description">
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <h2 className="text-xl font-bold">Room Features</h2>
                  {roomData?.data?.amenities?.map(
                    (paragraph: string, index: number) => (
                      <div key={index}>
                        <p className="text-muted-foreground">{paragraph}</p>
                      </div>
                    )
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

export default RoomDetails;
