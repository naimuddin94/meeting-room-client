import {
  CheckCircle,
  Shield,
} from "lucide-react";
import Feature from "./Feature";
import Container from "@/components/shared/Container";

function WhyChooseUs() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Why Choose Us?
        </h2>
        <p className="max-w-[90%] md:max-w-[60%] mx-auto text-muted-foreground text-center mb-8">
          We've revolutionized the meeting room booking experience, combining
          cutting-edge technology with user-centric design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Feature
            icon={<CheckCircle className="h-8 w-8 text-green-500" />}
            title="Seamless Booking Experience"
            description="Our intuitive platform ensures a smooth and effortless booking process from start to finish."
          />
          <Feature
            icon={<Shield className="h-8 w-8 text-blue-500" />}
            title="Secure Transactions"
            description="Your data and payments are protected with state-of-the-art security measures."
          />
        </div>
      </div>
    </Container>
  );
}

export default WhyChooseUs;



