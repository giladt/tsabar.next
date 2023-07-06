"use client";
import { ReactNode, forwardRef, useRef } from "react";
import { MdClose } from "react-icons/md";

type TDialogProps = {
  type: "calendar" | "gallery";
  children: ReactNode;
};

export const Dialog = forwardRef<HTMLDialogElement | null, TDialogProps>(
  ({ children }, ref) => {
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
        className="text-center opacity-0 flex-col
          transition-opacity overflow-hidden
          rounded-md drop-shadow-lg p-4 text-white
          fixed top-0 left-0 right-0 bottom-0 m-0
          inset-0 outline-none focus:outline-none
          min-w-fit h-fit hidden
          bg-stone-300 dark:bg-stone-700
        "
        onCancel={() => refDialog.current?.close()}
      >
        {children}
        <button
          className="absolute 
            -right-6 -top-6 h-10 w-10 
            rounded-full 
            bg-slate-500 hover:bg-slate-300 
            flex justify-center items-center 
            font-extrabold text-slate-300 hover:text-slate-950
          "
          onClick={() => refDialog.current?.close()}
        >
          <MdClose />
        </button>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
