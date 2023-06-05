"use client";

import { ReactNode, useRef } from "react";
import { store } from "@/store";
import { setStartupApartments } from "@/store/apartmentSlice";
import { setIsOpen, setStartupDialogContent } from "@/store/dialogSlice";
import { IApartmentData } from "@/utils/types";

interface TPreloaderProps {
  apartments: IApartmentData[];
  dialog: {
    isOpen: boolean;
    startupDialogContent: string;
  };
}

function Preloader({ apartments, dialog }: TPreloaderProps) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupApartments(apartments));
    store.dispatch(setIsOpen(dialog.isOpen));
    store.dispatch(setStartupDialogContent(dialog.startupDialogContent));
    loaded.current = true;
  }
  return null;
}

export default Preloader;
