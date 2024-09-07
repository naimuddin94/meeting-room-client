import { ReactNode } from "react";

interface IStepCardProps {
  icon: ReactNode;
  step: string;
  title: string;
  description: string;
}
function StepCard({ icon, step, title, description }: IStepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-muted rounded-full p-4 mb-4">{icon}</div>
      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
        {step}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default StepCard;
