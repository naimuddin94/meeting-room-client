import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bannerImages } from "./bannerImages";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <Container>
      <section className="relative flex flex-col-reverse md:flex-row justify-between items-center mt-5 overflow-hidden min-h-[80vh] h-[80vh] md:px-8">
        {/* Overlay */}
        <div className="absolute top-0 right-0 w-full h-full z-10 bg-gradient-to-r from-black/80 to-black/5"></div>

        {/* Carousel for Background Images */}
        <Carousel className="w-full h-full absolute inset-0 overflow-hidden">
          <CarouselContent
            className="w-[102%] h-full absolute inset-0 transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {bannerImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Banner content */}
        <div className="md:w-1/2 space-y-5 py-8 absolute z-20">
          <h1 className="text-white first-letter:text-theme text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Find Your Perfect Space for Meetings
          </h1>
          <p className="pb-5 text-white/80">
            Discover the perfect space for your meetings and events with our
            premium selection of meeting rooms and co-working spaces. Whether
            you're hosting a small team huddle, a large corporate meeting, or a
            brainstorming session, our spaces are thoughtfully designed to
            enhance productivity and inspire collaboration.
          </p>
          <Link to="/meeting-rooms">
            <Button variant="secondary">Book Now</Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Banner;
