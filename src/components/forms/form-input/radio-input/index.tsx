import { Fragment, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import FormField from "@/components/forms/form-input/form-field";
import { TFields } from "@/components/forms/inquiry";

type TValue = { text: string; isDirty: boolean; error?: string };

type TTextInputProps = {
  name: TFields;
  options: { value: string; label: string }[];
  value: TValue;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioInput({
  name,
  options,
  value,
  onChange,
}: TTextInputProps) {
  const peers = options.map((option) => {
    return {
      id: `peer/${option.value}`,
      checked: `peer-checked/${option.value}:bg-primary-dark peer-checked/${option.value}:text-black`,
    };
  });

  return (
    <FormField error={value.error}>
      <div className="flex flex-row items-center w-full gap-4 mt-7">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <Fragment key={uuidv4()}>
              <input
                id={id}
                className={`hidden ${peers[parseInt(option.value) - 1].id}`}
                type="radio"
                name={name}
                value={option.value}
                checked={value.text === option.value}
                onChange={onChange}
              />
              <label
                htmlFor={id}
                className={`
                  cursor-pointer
                  bg-transparent 
                  ${peers[parseInt(option.value) - 1].checked} 
                  w-full text-center
                  p-[0.625rem] 
                  rounded-lg border-2 border-solid 
                  outline-none focus-visible:border-primary-dark
                  ${
                    value.error
                      ? "border-tertiary-dark"
                      : "border-black/50 dark:border-white/50"
                  }
                `}
              >
                {option.label}
              </label>
            </Fragment>
          );
        })}
      </div>
    </FormField>
  );
}
