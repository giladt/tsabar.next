import { ReactNode } from "react";
import styles from "./form-field.module.scss";

type TFormFieldProps = {
  children: ReactNode;
};

export default function FormField({ children }: TFormFieldProps) {
  return <span className={styles.input_field}>{children}</span>;
}
