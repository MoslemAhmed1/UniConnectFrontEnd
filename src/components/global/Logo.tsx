import { cn } from "@/lib/utils";

type LogoProps = {
  showText?: boolean;
  imageClassName?: string;
};

const Logo = ({ showText = true, imageClassName }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/uniconnect_logo.svg"
        alt="UniConnect Logo."
        className={cn("size-14", imageClassName)}
      />
      {showText && <span className="font-bold text-2xl">UniConnect</span>}
    </div>
  );
};

export default Logo;
