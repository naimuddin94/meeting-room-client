import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import { featureCardData } from "@/utils";
import FeatureCard from "./FeatureCard";

function FeatureBrands() {
  return (
    <Container className="my-8">
      <div className="bg-primary-foreground dark:bg-muted/30 py-12 rounded-lg grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <Heading>Top Featured Brands</Heading>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Discover the most popular mechanical keyboard brands trusted by
            enthusiasts.
          </p>
        </div>
        <div className="grid  w-full grid-cols-2 items-center justify-center gap-6 md:grid-cols-4 lg:gap-12">
          {featureCardData.map((feature) => (
            <FeatureCard
              key={feature.name}
              image={feature.image}
              name={feature.name}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default FeatureBrands;
