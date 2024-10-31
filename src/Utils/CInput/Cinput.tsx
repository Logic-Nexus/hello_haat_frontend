import React from "react";
import { Tooltip } from "react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";
// import { BsCloudUpload } from "react-icons/bs";

interface CInputProps {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: any;
  defaultValue?: any;
  tooltip?: boolean;
  tooltipPosition?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  tooltipContent?: React.ReactNode;
  tooltipVariant?: "error" | "dark" | "success" | "warning" | "info" | "light";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
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
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  errorQuery?: boolean;
  style?: React.CSSProperties;
  autoComplete?: string;
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  step?: number;
  multiple?: boolean;
  accept?: string;
  endIcon?: any;
  width?: string;
}

const Cinput = ({
  type = "text",
  id = "",
  name = "",
  placeholder = "",
  className = "",
  value,
  tooltip,
  tooltipPosition = "right",
  tooltipContent = "",
  tooltipVariant = "dark",
  onChange,
  label,
  errorQuery,
  disabled = false,
  defaultValue,
  endIcon,
  width,
  ...rest
}: CInputProps) => {
  return (
    <>
      <section className="flex justify-between">
        <label
          htmlFor={label?.toLowerCase()}
          className="level text-sm text-gray-500 mb-1"
        >
          {label}
        </label>

        {errorQuery && (
          <div data-tooltip-id={id}>
            <span>
              <FaQuestionCircle
                className={`
                  ${
                    errorQuery
                      ? "text-red-500 animate-animate-bounce"
                      : "text-gray-500"
                  }
                `}
              />
            </span>
          </div>
        )}
      </section>
      <div className="relative flex">
        <input
          type={type}
          name={name}
          id={id}
          key={id}
          autoComplete="off"
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          className={`${className} ${
            width ? width : "w-full"
          }  border-1 border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:bg-black/10 focus:border-transparent placeholder:italic placeholder:text-sm 
          ${
            errorQuery
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }
          ${disabled && "opacity-20"}
          
          `}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-xl z-50 cursor-pointer">
            {endIcon}
          </div>
        )}
      </div>
      {tooltip && (
        <Tooltip
          id={id}
          place={tooltipPosition as any}
          content={tooltipContent as any}
          variant={tooltipVariant as any}
          opacity={1}
        />
      )}
    </>
  );
};

export default Cinput;
