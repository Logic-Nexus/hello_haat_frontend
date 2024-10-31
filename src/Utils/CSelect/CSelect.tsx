import React, { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { themeColor } from "../../constant";
import { FaQuestionCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

interface CSelectProps {
  name?: string;
  className?: string;
  onChange?: (selectedOptions: any) => void;
  id?: string;
  width?: string;
  label?: string;
  options: any;
  isMulti?: boolean;
  classNamePrefix?: string;
  defaultValue?: any;
  disabled?: boolean;
  value?: any;
  onClick?: () => void;
  loading?: boolean;
  errorQuery?: boolean;
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
}

const CSelect = ({
  name = "",
  className = "",
  id = "",
  width,
  label,
  options,
  isMulti,
  classNamePrefix,
  defaultValue,
  onChange,
  disabled,
  value,
  onClick,
  loading,
  errorQuery,
  tooltip,
  tooltipPosition = "right",
  tooltipContent = "",
  tooltipVariant = "dark",
  ...props
}: CSelectProps) => {
  const animatedComponents = makeAnimated();
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Function to handle focus
  const handleFocus = () => {
    if (!isFocused) {
      setIsFocused(true);
      if (onClick) onClick();
    }
  };

  // Handle outside click
  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const Control = ({ children, ...props }: any) => (
    <components.Control {...props} className="pl-[5px]">
      {children}
    </components.Control>
  );

  return (
    <main ref={selectRef}>
      <section className="flex justify-between">
        <label
          htmlFor={label?.toLowerCase()}
          className="level text-sm text-gray-500 mb-1 flex items-center"
        >
          {label}
          {loading && (
            <span className="animate-spin">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            </span>
          )}
        </label>

        {errorQuery && (
          <div data-tooltip-id={id}>
            <span>
              <FaQuestionCircle
                className={`${
                  errorQuery ? "text-red-500 animate-bounce" : "text-gray-500"
                }`}
              />
            </span>
          </div>
        )}
      </section>
      <div className="relative flex">
        <Select
          name={name}
          id={id}
          className={`${className} ${
            width ? width : "w-full"
          } border-0 border-primary rounded-md outline-none focus:ring-2 focus:bg-primary focus:border-transparent dark:bg-black/10`}
          onChange={(selectedOptions) => onChange?.(selectedOptions)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          classNamePrefix={classNamePrefix || "select"}
          closeMenuOnSelect={true}
          components={isMulti ? animatedComponents : { Control }}
          isMulti={isMulti}
          options={options}
          defaultValue={defaultValue}
          isDisabled={disabled}
          isClearable={true}
          isSearchable={true}
          value={
            options?.find((item: any) => item?.value === value) ||
            defaultValue ||
            null
          }
          {...props}
          styles={{
            option: (defaultStyles, state) => ({
              ...defaultStyles,
              zIndex: 9999,
              color: "#000",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f1f1f1",
                color: "#000",
              },
            }),
            singleValue: (defaultStyles) => ({
              ...defaultStyles,
              // zIndex: 999,
            }),
            control: (provided, state) => ({
              ...provided,
              border: errorQuery
                ? `1px solid red`
                : `2px solid ${themeColor.primary}`,
              borderRadius: "0.375rem",
              outlineColor: themeColor.primary,
              opacity: state.isDisabled ? ".5" : "1",
              cursor: state.isDisabled ? "not-allowed" : "default",
              "&:hover": {
                border: `2px solid ${themeColor.primary}`,
                outlineColor: themeColor.primary,
              },
              width: "100%",
            }),
          }}
        />
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
    </main>
  );
};

export default CSelect;
