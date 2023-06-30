import { Dancing_Script as GF_Dancing, Karla as GF_Karla } from "next/font/google";

export const dancing = GF_Dancing({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

export const karla = GF_Karla({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  preload: true,
});

const Fonts = {
  karla,
  dancing,
  cnKarla: karla.className,
  cnDancing: dancing.className
}

export default Fonts