import { HTMLInputTypeAttribute } from "react";
import FormField from "@/components/forms/form-input/form-field";

type TTextInputProps = {
  name: string;
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  min?: number | undefined;
  max?: number | undefined;
};

export default function TextInput({
  name,
  label,
  placeholder = "",
  type = "text",
  min,
  max,
}: TTextInputProps) {
  return (
    <FormField>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        title={label}
        min={min}
        max={max}
      />
      <label htmlFor={name}>{label}</label>
    </FormField>
  );
}
