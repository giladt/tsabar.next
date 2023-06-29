import { ReactNode } from "react";
import styles from "./form-field.module.scss";

type TFormFieldProps = {
  children: ReactNode;
  error?: string | null;
};

export default function FormField({ children, error = "" }: TFormFieldProps) {
  return (
    <span className={styles.input_field}>
      <span className={(error && styles.error) || ""}>{error}</span>
      {children}
    </span>
  );
}
