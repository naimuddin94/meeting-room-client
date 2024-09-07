import { Clock, CheckCircle, Calendar, HeadphonesIcon } from "lucide-react";
import ServiceCard from "./ServiceCard";
import Container from "@/components/shared/Container";

export default function ServiceAdvertisement() {
  return (
    <Container className="bg-gradient-to-r from-blue-500/25 to-purple-600/25 py-8 sm:py-12 md:py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
          Our Premium Booking Services
        </h2>
        <p className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Experience seamless meeting room bookings with our cutting-edge
          features designed to make your scheduling effortless and efficient.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <ServiceCard
            icon={<Clock className="h-6 w-6 sm:h-8 sm:w-8" />}
            title="Real-Time Availability"
            description="Check room availability instantly and make informed decisions."
          />
          <ServiceCard
            icon={<CheckCircle className="h-6 w-6 sm:h-8 sm:w-8" />}
            title="Instant Booking Confirmation"
            description="Receive immediate confirmation for your room reservations."
          />
          <ServiceCard
            icon={<Calendar className="h-6 w-6 sm:h-8 sm:w-8" />}
            title="Flexible Scheduling"
            description="Easily adjust your bookings to fit your changing needs."
          />
          <ServiceCard
            icon={<HeadphonesIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
            title="24/7 Support"
            description="Our team is always available to assist you with any inquiries."
          />
        </div>
      </div>
    </Container>
  );
}


