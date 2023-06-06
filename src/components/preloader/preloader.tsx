"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setStartupApartments } from "@/store/apartmentSlice";
import { IApartmentData } from "@/utils/types";

interface TPreloaderProps {
  apartments: IApartmentData[];
}

function Preloader({ apartments }: TPreloaderProps) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupApartments(apartments));
    loaded.current = true;
  }
  return null;
}

export default Preloader;
