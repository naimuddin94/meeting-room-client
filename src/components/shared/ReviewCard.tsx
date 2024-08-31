import { TRating } from "@/Types";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Rating from "./Rating";

const ReviewCard = ({ ratingInfo }: { ratingInfo: TRating }) => {
  const { user, rating, feedback, updatedAt } = ratingInfo;

  console.log(updatedAt);

  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage src={user.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <div className="grid gap-0.5 text-sm">
            <h2 className="font-semibold">{user.name}</h2>
            <time className="text-sm text-muted-foreground">
              {moment(updatedAt).fromNow()}
            </time>
          </div>
          <Rating rating={rating} />
        </div>
        <div className="text-sm leading-loose text-muted-foreground">
          <p>{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
