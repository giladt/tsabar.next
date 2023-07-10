import { ReactElement } from "react";
import FormField from "@/components/forms/form-input/form-field";

type TTextInputProps = {
  name: string;
  placeholder?: string;
  label: string;
};

export default function SelectInput(
  { name, label, placeholder = "" }: TTextInputProps,
  children: ReactElement<HTMLOptionElement> | ReactElement<HTMLOptionElement>[]
) {
  return (
    <FormField>
      <select name={name} placeholder={placeholder} title={label}>
        {placeholder && <option value="">Please select</option>}
        {children}
      </select>
      <label htmlFor={name}>{label}</label>
    </FormField>
  );
}
