"use client";
import { Gallery, Image } from "react-grid-gallery";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

import { useState, type FC, useEffect, useMemo } from "react";
import { wfImageUrl } from "@/utils/images";

type TCustomImage = Image & {
  original: string;
};

type TImageGalleryProps<T> = {
  images: T[];
};

export const ImageGallery: FC<
  TImageGalleryProps<{
    id: string;
    description: string;
    width: number;
    height: number;
  }>
> = ({ images }) => {
  const newImages: TCustomImage[] = images.map((image) => {
    return {
      src: wfImageUrl(image.id, "lg"),
      original: wfImageUrl(image.id, "lg"),
      width: image.width,
      height: image.height,
      alt: image.description,
      caption: image.description,
    };
  });

  const [index, setIndex] = useState(-1);
  const [tileHeight, setTileHeight] = useState<number>(250);
  const [containerHeight, setContainerHeight] = useState<string>("h-[80svh]");

  useEffect(() => {
    if (typeof window === "undefined") {
      // setTileHeight(250);
      // setContainerHeight(`h-[80svh]`);

      return;
    }
    window.onresize = () => {
      setTileHeight((window.innerHeight * 0.8) / 3);
      setContainerHeight(`h-[${3 * tileHeight + 3 * 4}]`);
    };
    return () => {
      window.onresize = null;
    };
  }, []);

  const currentImage = newImages[index];
  const nextIndex = (index + 1) % newImages.length;
  const nextImage = newImages[nextIndex] || currentImage;
  const prevIndex = (index + newImages.length - 1) % newImages.length;
  const prevImage = newImages[prevIndex] || currentImage;

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div
      className={`gallery-wrapper bg-black/50 overflow-hidden -mx-[calc(50svw-50%)] md:w-[calc(100svw-9px)] ${containerHeight}`}
    >
      <Gallery
        enableImageSelection={false}
        images={newImages}
        rowHeight={tileHeight}
        maxRows={3}
        onClick={handleClick}
      />
      {currentImage?.original && (
        <Lightbox
          mainSrc={currentImage.original}
          nextSrc={nextImage.original}
          prevSrc={prevImage.original}
          mainSrcThumbnail={currentImage.src}
          nextSrcThumbnail={nextImage.src}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          imageCaption={currentImage.caption}
        />
      )}
    </div>
  );
};
export default ImageGallery;
