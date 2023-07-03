import { Fragment, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import FormField from "@/components/forms/form-input/form-field";
import { TFields } from "@/components/forms/inquiry";

import styles from "./radio-input.module.scss";

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
  return (
    <FormField error={value.error} forwardClassRef="radio_buttons">
      <div className={styles.radioButtons}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <Fragment key={uuidv4()}>
              <input
                id={id}
                className={styles.radioInput}
                type="radio"
                name={name}
                value={option.value}
                checked={value.text === option.value}
                onChange={onChange}
              />
              <label
                htmlFor={id}
                className={`
                  ${
                    value.error
                      ? styles.error
                      : "border-black/50 dark:border-white/50"
                  }

                  ${styles.radioButton}
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
