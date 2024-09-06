import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import Rating from "@/components/shared/Rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { reviews } from "@/lib/fakeData";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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

  return (
    <Container className="my-8">
      <div className="border rounded-lg py-8">
        <div>
          <Heading>Customer Reviews</Heading>
        </div>
        <div className="relative w-full max-w-3xl mx-auto mt-5 px-4">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-full p-6 bg-muted/20 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <Avatar>
                      <AvatarImage src="" alt="user" />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Rating rating={review.rating} />
                    <blockquote className="text-muted-foreground">
                      "{review.quote}"
                    </blockquote>
                    <div>
                      <p className="text-muted-foreground">{review.name}</p>
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
