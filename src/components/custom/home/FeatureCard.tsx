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
          alt="Keychron Logo"
          className="aspect-[2/1] dark:invert overflow-hidden rounded-lg object-contain object-center"
        />
        {/* <div className="relative inline-block p-3">
          <img
            src={image}
            alt="Image"
            className="block dark:invert aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
          />
          <div className="absolute inset-0 bg-muted opacity-20 rounded-lg"></div>
        </div> */}
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
