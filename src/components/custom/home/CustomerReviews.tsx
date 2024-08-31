import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import Loader from "@/components/shared/Loader";
import Rating from "@/components/shared/Rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetchRatingsQuery } from "@/redux/api/ratingApi";
import { TRating } from "@/Types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerReviews() {
  const { data, isLoading } = useFetchRatingsQuery(undefined);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      quote:
        "This product has exceeded all my expectations. Highly recommended!",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      quote:
        "I'm so glad I found this. It's been a game-changer for my business.",
      rating: 2,
    },
    {
      id: 3,
      name: "Michael Johnson",
      quote:
        "Absolutely love this! The quality is top-notch and the customer service is amazing.",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Emily Davis",
      quote:
        "This is the best product I've used in years. I can't recommend it enough.",
      rating: 4.7,
    },
    {
      id: 5,
      name: "David Wilson",
      quote:
        "I'm so impressed with this product. It's made my life so much easier.",
      rating: 2.9,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.data?.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, data?.data?.length]);
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loader size={100} />;
  }


  return (
    <Container className="my-8">
      <div className="border rounded-lg py-8">
        <div>
          <Heading>Customers Reviews</Heading>
        </div>
        <div className="relative w-full max-w-3xl mx-auto mt-5 px-4">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data?.data?.map((review: TRating) => (
                <div
                  key={review._id}
                  className="flex-shrink-0 w-full p-6 bg-muted/20 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <Avatar>
                      <AvatarImage src={review?.user?.image} alt="user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Rating rating={review.rating} />
                    <blockquote className="text-muted-foreground">
                      "{review.feedback}"
                    </blockquote>
                    <div>
                      <p className="text-muted-foregroun">
                        {review.user.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="rounded-full"
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRightIcon className="w-5 h-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
