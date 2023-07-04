import { Button } from "@/components/button";
import { type ReactNode } from "react";
import { MdHouse } from "react-icons/md";

export default function ApartmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-0">
      <Button.Back href="/">
        <MdHouse />
      </Button.Back>
      {children}
    </div>
  );
}
