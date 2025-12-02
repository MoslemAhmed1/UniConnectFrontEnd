import type { ReactNode } from "react";

type SubtleParagraphProps = {
  children: ReactNode;
};

const SubtleParagraph = ({ children }: SubtleParagraphProps) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

export default SubtleParagraph;
