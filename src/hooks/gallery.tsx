import { useState, useEffect } from "react";

export const useGalleryObserveResize = (containerHeightSVH: number) => {
  const [tileHeightPX, setTileHeightPX] = useState<number>(250);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTileHeight = () => {
      setTileHeightPX(
        (window.innerHeight * (containerHeightSVH / 100)) / 3 - 4
      );
    };

    updateTileHeight();

    window.onresize = () => {
      updateTileHeight();
    };
    return () => {
      window.onresize = null;
    };
  }, []);

  return { tileHeight: tileHeightPX };
};
