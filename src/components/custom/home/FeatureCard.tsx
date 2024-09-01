type TFeatureCardProps = {
  image: string;
  name: string;
};

const FeatureCard = ({ name, image }: TFeatureCardProps) => {
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <img
          src={image}
          width="100"
          height="50"
          alt="Feature Image"
          className="aspect-[2/1] dark:invert overflow-hidden rounded-lg object-cover object-center"
        />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
