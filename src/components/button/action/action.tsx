import Link from "next/link";
import { ReactNode } from "react";
import { UrlObject } from "url";

type TActionButtonProps = {
  children: ReactNode;
  route: string | UrlObject;
};

export const ActionButton = ({ children, route }: TActionButtonProps) => {
  return (
    <Link
      role="button"
      type="button"
      href={route}
      className="flex justify-center mt-5 p-1 w-full 
      whitespace-nowrap text-center
      rounded-md outline outline-primary-dark 
      hover:bg-primary-dark hover:text-black 
      hover:shadow-md decoration-0 
      focus:bg-primary-dark focus:text-black"
    >
      {children}
    </Link>
  );
};
