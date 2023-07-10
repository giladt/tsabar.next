import { Roboto as GF_Roboto, Dancing_Script as GF_Dancing, Karla as GF_Karla } from "next/font/google";

export const roboto = GF_Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
  preload: true
});

export const dancing = GF_Dancing({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
  preload: true,
});

export const karla = GF_Karla({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-karla",
  preload: true,
});

const Fonts = {
  roboto,
  karla,
  dancing,
  cnRoboto: roboto.className,
  cnKarla: karla.className,
  cnDancing: dancing.className
}

export default Fonts