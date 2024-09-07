import { Calendar, CreditCard, MousePointer } from "lucide-react";
import StepCard from "./StepCard";
import Container from "@/components/shared/Container";

function HowItWorks() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-foreground">
          How It Works
        </h2>
        <p className="max-w-[90%] md:max-w-[60%] mx-auto text-muted-foreground text-center mb-8">
          Booking your perfect meeting room has never been easier. Our
          streamlined process takes you from selection to confirmation in just
          three simple steps
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <StepCard
            icon={<MousePointer className="h-10 w-10 text-purple-500" />}
            step="1"
            title="Select a Room"
            description="Browse our available rooms and choose the one that fits your needs."
          />
          <StepCard
            icon={<Calendar className="h-10 w-10 text-blue-500" />}
            step="2"
            title="Choose Date & Time"
            description="Pick your preferred date and time slot for your meeting or event."
          />
          <StepCard
            icon={<CreditCard className="h-10 w-10 text-green-500" />}
            step="3"
            title="Confirm Booking"
            description="Review your selection and confirm your booking with secure payment."
          />
        </div>
      </div>
    </Container>
  );
}

export default HowItWorks;