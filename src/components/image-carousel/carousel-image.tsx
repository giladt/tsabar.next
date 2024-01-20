import { wfImageUrl } from "@/utils/images";
import Image from "next/image";

export type TCarouselImage = {
  id: string;
  description?: string;
  priority?: boolean;
};

/**
 * TCarouselImageProps type definition
 * @property {TCarouselImage} image   - Image size properties
 * @property {string} styles          - (Tailwind) classnames
 * @property {number} size            - Image size properties
 * @property {number} size.w          - Width in pixels
 * @property {number} size.h          - Height in pixels
 * @property {"th" | "lg"} size.type  - Image src size thumbnail or large
 * @property {number} index  - Image src size thumbnail or large
 */
type TCarouselImageProps = {
  image: TCarouselImage;
  styles: string;
  size: {
    w: number;
    h: number;
    type: "th" | "lg";
  };
  index: number;
};

export const CarouselImage = ({
  image,
  styles,
  size,
  index,
}: TCarouselImageProps) => (
  <Image
    src={wfImageUrl(image.id, size.type)}
    alt={image.description || ""}
    width={size.w}
    height={size.h}
    priority={index === 0}
    className={styles}
  />
);
