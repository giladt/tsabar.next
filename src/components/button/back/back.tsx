import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

type TBackProps = {
  children?: ReactNode | string;
  href?: string;
  preIcon?: ReactElement<HTMLOrSVGElement>;
  surIcon?: ReactElement<HTMLOrSVGElement>;
};

export const Back = ({
  href = "/",
  children = "Back Home",
  preIcon = <MdArrowBack />,
  surIcon = undefined,
}: TBackProps) => {
  return (
    <Link
      className="
        text-black dark:text-white
        fixed top-2 left-2 h-9 px-2 rounded-full z-10
        flex items-center gap-1^
        bg-black/25 hover:bg-black/50
      "
      role="button"
      type="button"
      href={href}
    >
      {preIcon || ""} {children} {surIcon || ""}
    </Link>
  );
};
