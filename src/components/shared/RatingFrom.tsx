import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";

function RatingFrom() {
  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <CardHeader>
        <CardTitle>Rate Your Experience</CardTitle>
        <CardDescription>
          Please rate your experience and provide any additional feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <StarIcon className="w-6 h-6 fill-primary cursor-pointer" />
          <StarIcon className="w-6 h-6 fill-primary cursor-pointer" />
          <StarIcon className="w-6 h-6 fill-primary cursor-pointer" />
          <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground cursor-pointer" />
          <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground cursor-pointer" />
          <span className="text-2xl font-bold ml-4">3</span>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="feedback">Additional Feedback</Label>
          <Textarea
            id="feedback"
            rows={3}
            placeholder="Let us know your thoughts..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

export default RatingFrom;
