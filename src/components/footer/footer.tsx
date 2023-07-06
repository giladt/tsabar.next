"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { TbHome } from "react-icons/tb";
import { IconType } from "react-icons/lib";

type TFooterLinks = [string, React.ReactElement<IconType> | string][];

const footerLinks: TFooterLinks = [
  ["/", <TbHome key={1} />],
  ["/about", "About"],
  ["/imprint", "Imprint"],
];

const Love = () => (
  <span className="max-[512px]:hidden whitespace-nowrap text-xs">
    Made with 💓 in Berlin
  </span>
);

const Copyright = () => (
  <span className="whitespace-nowrap text-xs">© TSABAR.net 2023</span>
);

const Navigation = () => {
  const currentPath = usePathname();
  return (
    <span className="flex ml-auto max-[512px]:mr-auto items-center mr-1">
      {footerLinks.map(([url, label]) => {
        return (
          <Link key={uuidv4()} href={url} className="flex items-center">
            <span
              className={url === currentPath ? "opacity-100" : "opacity-75"}
            >
              {label}
            </span>
            <span className="mx-1">|</span>
          </Link>
        );
      })}
    </span>
  );
};

export const Footer = () => {
  return (
    <footer
      className="flex flex-wrap h-auto p-2 justify-between
        max-w-screen-md mx-auto items-center text-sm
        fixed bg-inherit left-0 right-0 bottom-0 z-10
      "
      suppressHydrationWarning={true}
    >
      <Love />
      <Navigation />
      <Copyright />
    </footer>
  );
};
