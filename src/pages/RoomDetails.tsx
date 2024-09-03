import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useFetchSingleRoomQuery } from "@/redux/api/roomApi";
import { currentToken, currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";

function RoomDetails() {
  const { id } = useParams();
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();

  const { data: roomData, isLoading } = useFetchSingleRoomQuery(id as string, {
    skip: !id,
  });

  if (isLoading) {
    return <Loader size={200} />;
  }

  const handleBooking = (id: string) => {
    if (!token) {
      return navigate("/login");
    } else if (token) {
      return navigate(`/dashboard/checkout/${id}`, {
        state: { pricePerSlot: roomData?.data?.pricePerSlot },
      });
    }
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
                  onClick={() => handleBooking(id!)}
                  variant="outline"
                  className="mt-4"
                >
                  Book Now
                </Button>

                <Link to={`/dashboard/edit-room/${roomData?.data?._id}`}>
                  <Button size="lg" variant="secondary" className="mt-4">
                    Edit Room
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => handleBooking(id!)}
                className="mt-4"
              >
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
                  <h2 className="text-xl font-bold">Amenities</h2>
                  <div className="flex flex-wrap gap-3">
                    {roomData?.data?.amenities?.map(
                      (item: string, index: number) => (
                        <div key={index} className="w-fit">
                          <Badge variant="outline">{item}</Badge>
                        </div>
                      )
                    )}
                  </div>
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
                          How can I book a meeting room?
                        </p>
                        <p className="text-muted-foreground">
                          You can book a meeting room by selecting your
                          preferred date and time on our platform, choosing an
                          available room, and confirming your booking.
                        </p>
                      </div>
                      <div className="grid gap-1">
                        <p className="font-medium">
                          What amenities are included in the meeting rooms?
                        </p>
                        <p className="text-muted-foreground">
                          Our meeting rooms come equipped with high-speed Wi-Fi,
                          projectors, whiteboards, and conference phones.
                          Additional amenities can be requested at the time of
                          booking.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <p className="font-medium">
                          Can I cancel or modify my booking?
                        </p>
                        <p className="text-muted-foreground">
                          Yes, you can cancel or modify your booking up to 24
                          hours before the scheduled time without any charges.
                          Changes within 24 hours may incur a fee.
                        </p>
                      </div>
                      <div className="grid gap-1">
                        <p className="font-medium">
                          Are there any discounts for recurring bookings?
                        </p>
                        <p className="text-muted-foreground">
                          We offer discounts for recurring bookings. Please
                          contact our support team for more details and to set
                          up a recurring booking plan.
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
