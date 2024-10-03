"use client";
import { Gallery, Image } from "react-grid-gallery";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

import { useState, type FC } from "react";
import { localImageUrl, wfImageUrl } from "@/utils/images";
import { useGalleryObserveResize } from "@/hooks/gallery";

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
    isLocal: boolean;
  }>
> = ({ images }) => {
  const newImages: TCustomImage[] = images.map((image) => {
    return {
      src: image.isLocal ? localImageUrl(image.id) : wfImageUrl(image.id, "lg"),
      original: image.isLocal ? localImageUrl(image.id) : wfImageUrl(image.id, "lg"),
      width: image.width,
      height: image.height,
      alt: image.description,
      caption: image.description,
    };
  });

  const [index, setIndex] = useState(-1);
  const { tileHeight } = useGalleryObserveResize(80);
  const currentImage = newImages[index];
  const nextIndex = (index + 1) % newImages.length;
  const nextImage = newImages[nextIndex] || currentImage;
  const prevIndex = (index + newImages.length - 1) % newImages.length;
  const prevImage = newImages[prevIndex] || currentImage;

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  const { original, src, caption } = currentImage || { original: "", src: "", caption: "" }; 
  const { original: nextImageOriginal, src: nextThumb } = nextImage || { original: "", src: "", caption: "" };
  const { original: prevImageOriginal, src: prevThumb } = prevImage || { original: "", src: "", caption: "" };

  return (
    <div
      className={`gallery-wrapper bg-black/50 overflow-hidden -mx-[calc(50svw-50%)] md:w-[calc(100svw-9px)] h-[80svh]`}
    >
      <Gallery
        enableImageSelection={false}
        images={newImages}
        rowHeight={tileHeight}
        maxRows={3}
        onClick={handleClick}
      />
      {original && (
        <Lightbox
          closeLabel="Close"
          clickOutsideToClose
          mainSrc={original}
          nextSrc={nextImageOriginal}
          prevSrc={prevImageOriginal}
          mainSrcThumbnail={src}
          nextSrcThumbnail={nextThumb}
          prevSrcThumbnail={prevThumb}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          imageCaption={caption}
        />
      )}
    </div>
  );
};
export default ImageGallery;
