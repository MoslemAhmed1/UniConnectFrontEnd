type LogoProps = {
  showText?: boolean;
};

const Logo = ({ showText = true }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/uniconnect_logo.svg"
        alt="UniConnect Logo."
        className="size-14"
      />
      {showText && <span className="font-bold text-2xl">UniConnect</span>}
    </div>
  );
};

export default Logo;
