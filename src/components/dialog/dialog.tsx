"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import Calendar from "../calendar/calendar";
import styles from "./dialog.module.scss";
import { setIsOpen } from "@/store/dialogSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function Dialog() {
  const refDialog = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  const dialogContent = useAppSelector(
    (state) => state.dialog.startupDialogContent
  );
  const apartments = useAppSelector(
    (state) => state.apartments.startupApartments
  );

  const [dialogComponentName, apartmentName] = dialogContent.split("|");
  const onClose = () => {
    dispatch(setIsOpen(false));
  };

  let parentRef: HTMLElement;
  useEffect(() => {
    if (refDialog.current?.parentElement) {
      parentRef = refDialog.current.parentElement;
    }

    const handleOuterClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.querySelector("dialog") !== null
      )
        onClose();
    };

    const handleOuterKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      parentRef.classList.add(styles.addBlur, styles.backdrop);
    } else {
      parentRef.classList.remove(styles.addBlur);
    }
    parentRef?.addEventListener("click", handleOuterClick);
    parentRef?.addEventListener("keydown", handleOuterKeyPress);
    return () => {
      parentRef?.removeEventListener("click", handleOuterClick);
      parentRef?.removeEventListener("keydown", handleOuterKeyPress);
    };
  }, [isOpen, refDialog.current]);
  return (
    <dialog
      ref={refDialog}
      open={isOpen}
      className={styles.dialog}
      onCancel={() => onClose()}
    >
      <button className={styles.button_close} onClick={onClose}>
        X
      </button>
      <h1>Availability</h1>

      <Calendar apartment={apartmentName} className={styles.calendar} />
    </dialog>
  );
}
