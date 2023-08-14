import { HTMLInputTypeAttribute, ChangeEvent, FocusEvent } from "react";
import FormField from "@/components/forms/form-input/form-field";
import { TFields } from "@/components/forms/inquiry";
import { TAutoCompleteAttr } from "@/utils/types";

type TValue = { text: string; isDirty: boolean; error?: string };

type TTextInputProps = {
  name: TFields;
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: TAutoCompleteAttr;
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
  autoComplete = "on",
  min,
  max,
}: TTextInputProps) {
  return (
    <FormField error={value.error}>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        title={label}
        value={value.text as string}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        min={min}
        max={max}
        className={`peer 
          bg-transparent p-[0.625rem] rounded-lg border-2 border-solid outline-none focus-visible:border-primary-dark
          ${
            value.error
              ? "border-tertiary-dark"
              : "border-black/50 dark:border-white/50"
          }
        `}
      />
      <label
        htmlFor={name}
        className="text-base leading-5 
          w-max -z-10 
          transition-all duration-150 ease-out 
          translate-x-4 translate-y-[2.15rem]
          peer-focus-within:translate-x-0 
          peer-focus-within:translate-y-0 
          peer-focus-within:text-sm
          peer-[&:not(:placeholder-shown)]:translate-x-0 
          peer-[&:not(:placeholder-shown)]:translate-y-0 
          peer-[&:not(:placeholder-shown)]:text-sm
        "
      >
        {label}
      </label>
    </FormField>
  );
}
