import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";

function ProductReview() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-6">
        <img
          src="/placeholder.svg"
          alt="Mechanical Keyboard"
          width={800}
          height={600}
          className="rounded-lg object-cover w-full aspect-[4/3]"
        />
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Acme Mechanical Keyboard</h1>
          <p className="text-muted-foreground">
            Experience the ultimate typing experience with our premium
            mechanical keyboard. Crafted with precision and designed for both
            work and play, this keyboard will elevate your productivity and
            gaming performance.
          </p>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">$99.99</h2>
            <Button size="lg">Buy Now</Button>
          </div>
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">John Doe</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  This keyboard is an absolute game-changer! The tactile
                  feedback and responsiveness are unparalleled. Highly
                  recommended for both work and gaming.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Jane Smith</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  I absolutely love this keyboard! The build quality is
                  top-notch, and the customization options are endless. It's a
                  must-have for any serious typist or gamer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <form className="grid gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="rating" className="text-base">
                Rating
              </Label>
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="review" className="text-base">
                Review
              </Label>
              <Textarea
                id="review"
                placeholder="Write your review..."
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" size="lg">
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductReview;
