import Link from "next/link";
import { type ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

export default function ApartmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-0">
      {children}
      <Link
        className="flex items-center gap-1 
          fixed top-2 left-2 h-9 px-2
          rounded-full z-10 
          bg-black/25
          hover:bg-black/50
          text-black dark:text-white"
        role="button"
        type="button"
        href={"/"}
      >
        <MdArrowBack /> Back Home
      </Link>
    </div>
  );
}
