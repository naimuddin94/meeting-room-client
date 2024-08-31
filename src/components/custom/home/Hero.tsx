import heroImage from "@/assets/images/hero-244.webp";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container>
      <section className="relative flex flex-col-reverse md:flex-row justify-between items-center mt-5 overflow-hidden">
        <div className="absolute right-0 bg-theme/15 w-96 h-96 rounded-full blur-3xl" />
        <div className="flex-1 space-y-5 py-8">
          <h1 className="first-letter:text-theme text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Experience the Precision of Mechanical Mastery
          </h1>
          <p className="text-muted-foreground pb-5">
            Discover the ultimate typing experience with our premium mechanical
            keyboards. Engineered for professionals and enthusiasts, our
            keyboards combine unmatched durability, sleek design, and superior
            performance. Elevate your workflow and enjoy every keystroke with
            our top-tier selection.
          </p>
          <Link to="/products">
            <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>
        <div className="flex-1 relative">
          <img
            src={heroImage}
            alt="Hero section image"
            className="max-h-fit md:hidden"
          />
          <img
            src={heroImage}
            alt="Hero section image"
            className="max-h-fit absolute -rotate-45 bottom-10 opacity-10 md:opacity-100"
          />

          <img
            src={heroImage}
            alt="Hero section image"
            className="max-h-fit hidden md:flex absolute -rotate-45 -right-6"
          />
        </div>
      </section>
    </Container>
  );
};

export default Hero;
