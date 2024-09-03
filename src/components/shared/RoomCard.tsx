import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { IRoom } from "@/Types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

function RoomCard({ room }: { room: IRoom }) {
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();
  const { _id, name, image, amenities, capacity, pricePerSlot } = room;

  const handleBooking = (id: string) => {
    if (!token) {
      return navigate("/login");
    } else if (token) {
      return navigate(`/dashboard/checkout/${id}`, {
        state: { pricePerSlot },
      });
    }
    toast({
      title: "Add to cart successfully",
    });
  };

  return (
    <Link to={`/room/${_id}`} className="flex flex-col h-full">
      <Card className="w-full flex flex-col justify-between max-w-md hover:shadow hover:shadow-theme/50 duration-500 flex-grow">
        <div className="p-4 flex-1">
          <img
            src={image}
            alt="Mechanical Keyboard"
            className="rounded-t-lg object-cover w-full aspect-[4/3]"
          />
        </div>
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {/* <div className="flex items-center justify-end gap-3">
              <Rating rating={5} />
            </div> */}
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription className="text-muted-foreground">
              <p className="text-green-500">Features: </p>
              {amenities.map((item, index) => (
                <span key={index}>{item}, </span>
              ))}
            </CardDescription>
            <CardTitle className="text-sm">Capacity: {capacity}</CardTitle>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${pricePerSlot}</span>

            <Button
              type="submit"
              variant="outline"
              onClick={() => handleBooking(_id)}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RoomCard;
