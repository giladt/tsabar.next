"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import styles from "./footer.module.scss";
import { TbHome } from "react-icons/tb";
import { IconType } from "react-icons/lib";

type TFooterLinks = [string, React.ReactElement<IconType> | string][];

const footerLinks: TFooterLinks = [
  ["/", <TbHome />],
  ["/about", "About"],
  ["/imprint", "Imprint"],
];

export const Footer = () => {
  const currentPath = usePathname();

  return (
    <footer className={styles.footer} suppressHydrationWarning={true}>
      <span className={styles.love}>Made with 💓 in Berlin</span>
      <span className={styles.navigation}>
        {footerLinks.map(([url, label]) => {
          if (url === "/" && currentPath === "/") return null;
          return (
            <Link
              key={uuidv4()}
              href={url}
              className={styles[url === currentPath ? "active" : ""]}
            >
              <span>{label}</span>
              <span>|</span>
            </Link>
          );
        })}
      </span>
      <span>© TSABAR.net 2023</span>
    </footer>
  );
};
