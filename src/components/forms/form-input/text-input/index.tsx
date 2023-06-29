import { HTMLInputTypeAttribute, ChangeEvent, FocusEvent } from "react";
import FormField from "@/components/forms/form-input/form-field";
import { TFields } from "@/components/forms/inquiry";

import styles from "./text-input.module.scss";

type TValue = { text: string; isDirty: boolean; error?: string };

type TTextInputProps = {
  name: TFields;
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  min?: number | undefined;
  max?: number | undefined;
  value: TValue;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  name,
  label,
  placeholder = " ",
  type = "text",
  value,
  onChange,
  onBlur,
  min,
  max,
}: TTextInputProps) {
  return (
    <FormField error={value.error}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        title={label}
        value={value.text as string}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        className={
          value.error ? styles.error : "border-black/50 dark:border-white/50"
        }
      />
      <label htmlFor={name}>{label}</label>
    </FormField>
  );
}
