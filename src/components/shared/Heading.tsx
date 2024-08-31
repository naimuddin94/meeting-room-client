const Heading = ({ children }: { children: string }) => {
  return (
    <div>
      <div className="relative max-w-fit mx-auto">
        <div className="absolute w-20 h-10 bg-theme/30 top-2 -right-8 blur-xl" />
        <div className="w-6 h-full bg-gradient-to-r from-theme absolute rounded-sm rotate-45 -top-5 left-3" />
        <h1 className="text-4xl font-extrabold pl-8">{children}</h1>
        <h1 className="text-4xl font-extrabold absolute top-1 left-8 opacity-30">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
