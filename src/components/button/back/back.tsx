import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

type TNavigationIconButtonProps = {
  children?: ReactNode | string;
  href?: string;
  preIcon?: ReactElement<HTMLOrSVGElement>;
  surIcon?: ReactElement<HTMLOrSVGElement>;
};

export const NavigationIconButton = ({
  href = "/",
  children = "Back Home",
  preIcon = <MdArrowBack />,
  surIcon = undefined,
}: TNavigationIconButtonProps) => {
  return (
    <Link
      role="button"
      type="button"
      href={href}
      className="flex items-center gap-1
        text-black dark:text-white
        fixed top-2 left-2 h-9 px-2 rounded-full z-10
        bg-black/25 hover:bg-black/50"
    >
      {preIcon}
      {children}
      {surIcon}
    </Link>
  );
};
