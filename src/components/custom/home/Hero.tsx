import { useState, useEffect } from "react";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import multiple hero images
import heroImage1 from "@/assets/images/hero-one.jpg";
import heroImage2 from "@/assets/images/hero-two.jpg";
import heroImage3 from "@/assets/images/hero-three.jpg";
import heroImage4 from "@/assets/images/hero-four.jpg";

const Hero = () => {
  const images = [heroImage1, heroImage2, heroImage3, heroImage4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const nextImage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false);
    }, 1000); // Slide transition duration
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <section className="relative flex flex-col-reverse md:flex-row justify-between items-center mt-5 overflow-hidden min-h-[80vh] h-fit md:px-8">
        {/* Overlay */}
        <div className="absolute top-0 right-0 w-full h-full z-10 bg-gradient-to-r from-black/90 to-black/5"></div>

        {/* Image Slider */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div
            className={`flex w-[200%] h-full transition-transform duration-1000 ease-in-out transform ${
              isSliding ? "translate-x-[-50%]" : "translate-x-0"
            }`}
          >
            <div
              className="w-1/2 h-full"
              style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className="w-1/2 h-full"
              style={{
                backgroundImage: `url(${
                  images[(currentImageIndex + 1) % images.length]
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>

        <div className="md:w-1/2 space-y-5 py-8 absolute z-20">
          <h1 className="first-letter:text-theme text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Find Your Perfect Space for Meetings
          </h1>
          <p className="pb-5 text-white/80">
            Discover the perfect space for your meetings and events with our
            premium selection of meeting rooms and co-working spaces. Whether
            you're hosting a small team huddle, a large corporate meeting, or a
            brainstorming session, our spaces are thoughtfully designed to
            enhance productivity and inspire collaboration.
          </p>
          <Link to="/products">
            <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>

        <div className="absolute bottom-5 right-5 z-20 flex space-x-3">
          {images.map((_, index) => (
            <Button
              key={index}
              onClick={() => {
                setIsSliding(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsSliding(false);
                }, 1000); // Slide transition duration
              }}
              variant={currentImageIndex === index ? "default" : "ghost"}
              size="sm"
              className={`w-3 h-3 rounded-full p-0 ${
                currentImageIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Hero;
