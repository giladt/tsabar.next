import { ReactNode } from "react";

type TFormFieldProps = {
  children: ReactNode;
  error?: string | null;
};

export default function FormField({ children, error = "" }: TFormFieldProps) {
  return (
    <fieldset className="flex flex-col-reverse gap-0 grow relative">
      <span
        className={
          (error && "h-0 m-0 p-0 text-sm text-tertiary-dark absolute") || ""
        }
      >
        {error}
      </span>
      {children}
    </fieldset>
  );
}
