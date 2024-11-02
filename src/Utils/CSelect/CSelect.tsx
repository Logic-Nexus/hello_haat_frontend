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
  isClearable?: boolean;
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
  isClearable = true,
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
      {label && (
        <section className="flex justify-between">
          <label
            htmlFor={label?.toLowerCase()}
            className="level text-sm text-gray-500 mb-1 flex items-center"
          >
            {label}
          </label>

          {errorQuery && (
            <div data-tooltip-id={id}>
              <span>
                <FaQuestionCircle
                  className={`${
                    errorQuery
                      ? "text-red-500 animate-animate-bounce"
                      : "text-gray-500"
                  }`}
                />
              </span>
            </div>
          )}
        </section>
      )}
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
          isClearable={isClearable}
          isSearchable={true}
          isLoading={loading}
          value={
            options?.find((item: any) => item?.value === value) ||
            defaultValue ||
            null
          }
          {...props}
          styles={{
            option: (defaultStyles) => ({
              ...defaultStyles,
              zIndex: 9999,
              color: "#000",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f1f1f1",
                color: themeColor.primary,
              },
            }),
            singleValue: (defaultStyles) => ({
              ...defaultStyles,
              // zIndex: 999,
              outlineColor: themeColor.primary,
            }),
            control: (provided, state) => ({
              ...provided,
              border: errorQuery ? `1px solid red` : `1px solid #ccc`,
              borderRadius: "0.375rem",
              outlineColor: themeColor.primary,
              opacity: state.isDisabled ? ".5" : "1",
              cursor: state.isDisabled ? "not-allowed" : "default",
              "&:hover": {
                border: `1px solid ${themeColor.primary}`,
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
