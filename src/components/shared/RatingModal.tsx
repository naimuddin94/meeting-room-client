import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAddRatingMutation } from "@/redux/api/ratingApi";
import { TRating } from "@/Types";
import { StarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

type TModalProps = {
  open: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  ratingData?: TRating;
  product?: string;
};

function RatingModal({ open, setShowModel, product }: TModalProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const [addRatingFn] = useAddRatingMutation();

  const onSubmit = async () => {
    const newFeedback = {
      product,
      rating,
      feedback,
    };
    await addRatingFn(newFeedback)
      .unwrap()
      .then((res) => {
        if (res?.statusCode === 201) {
          toast({
            title: res?.message,
            duration: 2000,
          });
          setFeedback("");
          setRating(5);
        }
      })
      .catch((error) => {
        toast({
          title: error?.data?.message,
          duration: 2000,
        });
      })
      .finally(() => {
        setShowModel(false);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setShowModel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-md">Give your feedback</DialogTitle>
          <DialogDescription className="text-xs">
            Share your experience with this product. Your feedback helps us
            improve and serve you better.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="">
            <div>
              <div className="flex items-center gap-0.5 ml-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`w-6 h-6 cursor-pointer ${
                      index < rating
                        ? "fill-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <Label htmlFor="feedback" className="text-right">
              Feedback
            </Label>
            <Textarea
              onChange={(e) => setFeedback(e.target.value)}
              value={feedback}
              id="feedback"
              placeholder="Share your feedback and help us serve you better."
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RatingModal;
