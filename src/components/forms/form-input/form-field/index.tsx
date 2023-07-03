import { ReactNode } from "react";
import styles from "./form-field.module.scss";

type TFormFieldProps = {
  children: ReactNode;
  forwardClassRef?: string;
  error?: string | null;
};

export default function FormField({
  children,
  forwardClassRef,
  error = "",
}: TFormFieldProps) {
  return (
    <span
      className={`
        ${styles.input_field} 
        ${styles[forwardClassRef || ""]}
      `}
    >
      <span className={(error && styles.error) || ""}>{error}</span>
      {children}
    </span>
  );
}
