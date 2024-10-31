import React from "react";

interface CheckBoxProps {
  id?: any;
  name?: any;
  type: string;
  rounded?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onInvalid?: (e: React.FormEvent<HTMLInputElement>) => void;
  onReset?: (e: React.FormEvent<HTMLInputElement>) => void;
  onSelect?: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  pl?: string;
  required?: boolean;
  style?: string;
  value?: string;
  defaultValue?: string;
  fontSize?: string;
  label?: string;
}

const SelectField = ({
  id,
  name,
  label,
  type,
  rounded,
  checked,
  disabled,
  onChange,
  defaultChecked,
  style,
  pl,
  value,
  defaultValue,
  required,
  fontSize,
}: CheckBoxProps) => {
  return (
    <>
      <main className={`block min-h-6 ${pl ? pl : "pl-0"} mt-1`}>
        <label>
          <input
            id={id ? id : "checkbox-1"}
            type={type}
            name={name ? name : "checkbox-1"}
            className={`
            ${fontSize ? fontSize : "text-md"}
              mr-2
              text-purple-600
              border-2
              border-purple-600
              ${rounded ? rounded : "rounded"}
              cursor-pointer
              focus:outline-none
              checked:text-purple-600
              checked:border-purple-600
              checked:bg-purple-600
              disabled:text-gray-400
              disabled:border-gray-400
              disabled:cursor-not-allowed
              disabled:checked:text-gray-400
              disabled:checked:border-gray-400
              disabled:checked:cursor-not-allowed
              focus:ring-1
              focus:ring-purple-600
              focus:ring-opacity-50
              dark:bg-gray-800
              dark:border-purple-600
              dark:checked:text-purple-600
              dark:checked:border-purple-600
              dark:focus:ring-purple-600
              dark:focus:ring-opacity-50
              dark:disabled:text-gray-400
              dark:disabled:border-gray-400
              dark:disabled:cursor-not-allowed
              dark:disabled:checked:text-gray-400
              dark:disabled:checked:border-gray-400
              dark:disabled:checked:cursor-not-allowed
              ${style ? style : ""}
              `}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            checked={checked}
            onChange={onChange}
            defaultChecked={defaultChecked}
            required={required}
          />
          <label
            htmlFor={id ? id : "checkbox-1"}
            className={`
              cursor-pointer select-none dark:bg-black/10
              ${fontSize ? fontSize : "text-md"}
              `}
          >
            {label ? label : `Checkbox ${id ? id : "1"}`}
          </label>
        </label>
      </main>
    </>
  );
};

export default SelectField;
