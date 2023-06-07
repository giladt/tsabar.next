"use client";
import { ReactNode, forwardRef, useRef } from "react";
import styles from "./dialog.module.scss";

type TDialogProps = {
  type: "calendar" | "gallery";
  children: ReactNode;
};

export const Dialog = forwardRef<HTMLDialogElement | null, TDialogProps>(
  ({ type, children }, ref) => {
    const refDialog = useRef<HTMLDialogElement | null>(null);

    return (
      <dialog
        ref={(node) => {
          refDialog.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`${styles.dialog} ${styles[type]}`}
        onCancel={() => refDialog.current?.close()}
      >
        {children}
        <button
          className={styles.button_close}
          onClick={() => refDialog.current?.close()}
        >
          X
        </button>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
