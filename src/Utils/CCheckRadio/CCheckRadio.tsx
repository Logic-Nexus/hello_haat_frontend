import React from "react";

interface CheckRadioProps {
  type: "radio" | "checkbox";
  id?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CCheckRadio = ({
  type,
  id,
  name,
  className,
  label,
  defaultChecked,
  checked,
  onClick,
  onChange,
}: CheckRadioProps) => {
  return (
    <>
      <input
        onClick={onClick}
        type={type}
        name={name}
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        className={`${className} h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded`}
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </>
  );
};

export default CCheckRadio;
