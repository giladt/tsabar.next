"use client";
import { ReactNode, forwardRef, useRef } from "react";
import { MdClose } from "react-icons/md";

type TDialogProps = {
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
          transition-opacity
          rounded-md drop-shadow-lg p-4 
          fixed top-0 left-0 right-0 bottom-0 
          inset-0 outline-none focus:outline-none
          w-auto min-w-fit h-fit hidden
          bg-stone-100 dark:bg-stone-700
          open:opacity-100 open:flex open:mx-6
          overflow-visible
          backdrop:backdrop-blur-md
        "
        onCancel={() => refDialog.current?.close()}
      >
        {children}
        <button
          className="absolute 
            -right-4 -top-4 h-8 w-8
            rounded-full 
            bg-tertiary-dark
            text-white
            flex justify-center items-center 
            font-extrabold 
            hover:bg-slate-500 hover:text-slate-950
          "
          title="Close"
          onClick={() => refDialog.current?.close()}
        >
          <MdClose />
        </button>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
