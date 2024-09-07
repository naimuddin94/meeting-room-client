import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">
        {title}
      </h3>
      <p className="text-center text-xs sm:text-sm opacity-80">{description}</p>
    </div>
  );
}

export default ServiceCard;
