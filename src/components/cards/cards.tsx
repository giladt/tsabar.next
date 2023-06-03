"use client";

import { useState } from "react";
import { TBookings } from "@/app/page";
import { Card } from "@/components/card/card";
import { Carousel } from "@/components/carousel/carousel";
import apartments from "@/assets/images.json";
import styles from "./cards.module.scss";

type TCardsProps = {
  bookings: TBookings;
};
export default function Cards({ bookings }: TCardsProps) {
  const [modalImages, setModalImages] = useState<
    { id: string; description: string }[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main id="main" className={styles.main}>
      <h1>Le Petit Moabit</h1>
      <h2>
        Modern, fully renovated, all-inclusive apartments for rent in the heart
        of Berlin
      </h2>
      <div className={styles.cards}>
        {apartments.map((apartment) => (
          <Card
            key={apartment.id}
            apartment={{
              ...apartment,
              bookings,
              image: apartment.images[0],
            }}
            onClick={() => {
              setModalImages(apartment.images);
              setIsOpen(true);
            }}
          ></Card>
        ))}
      </div>
      <Dialog
        images={modalImages}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </main>
  );
}
type TDialogProps = {
  images?: { id: string; description: string }[] | null;
  isOpen?: boolean;
  onClose: () => void;
};
const Dialog = ({ images = null, isOpen = false, onClose }: TDialogProps) => {
  return (
    <dialog open={isOpen} className={styles.dialog}>
      <button className={styles.button_close} onClick={onClose}>
        X
      </button>
      <Carousel images={images} />
    </dialog>
  );
};
