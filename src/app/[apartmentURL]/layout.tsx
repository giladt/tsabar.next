import { LinkBtn } from "@/components/button";
import { type ReactNode } from "react";
import { MdHouse } from "react-icons/md";

export default function ApartmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-0">
      <LinkBtn.NavigationIcon href="/">
        <MdHouse />
      </LinkBtn.NavigationIcon>
      {children}
    </div>
  );
}
