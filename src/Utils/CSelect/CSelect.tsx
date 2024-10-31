"use client";

// import Select from "react-select/dist/declarations/src/Select";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { themeColor } from "../../constant";

interface CSelectProps {
  name?: string;
  className?: string;
  onChange?: (selectedOptions: any) => void;
  id?: string;
  width?: string;
  label?: string;
  options?: any;
  isMulti?: boolean;
  classNamePrefix?: string;
  defaultValue?: any;
  disabled?: boolean;
  value?: any;
  onClick?: (e: any) => void;
  loading?: boolean;
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
  ...props
}: CSelectProps) => {
  // const { theme } = useTheme();
  const animatedComponents = makeAnimated();

  const Control = ({ children, ...props }: any) => (
    <components.Control {...props} className="pl-[5px]">
      {children}
    </components.Control>
  );

  return (
    <main onClick={onClick && onClick}>
      <label
        htmlFor={label?.toLowerCase()}
        className="level text-sm text-gray-500 flex items-center gap-2"
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

      <Select
        name={name}
        id={id}
        className={`${className} ${
          width ? width : "w-full"
        }  border-0 border-dark-primary rounded-md outline-none focus:ring-2 focus:bg-primary focus:border-transparent dark:bg-black/10 `}
        onChange={(selectedOptions) => onChange?.(selectedOptions)}
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
            // backgroundColor: theme === "dark" ? "#0D1526" : "#0C5164",
            color: "#000",
            backgroundColor: "#fff",
            height: "100%",
            "&:hover": {
              // backgroundColor: theme === "dark" ? "#0C5164" : "#0D1526",
              backgroundColor: "#f1f1f1",
              color: "#000",
            },
          }),
          singleValue: (defaultStyles) => ({
            ...defaultStyles,
            // color: theme === "dark" ? "#fff" : "#0C5164",
            zIndex: 9999,
          }),
          control: (provided, state) => ({
            ...provided,
            border: `2px solid ${themeColor.primary}`,
            borderRadius: "0.375rem",
            outlineColor: themeColor.primary,
            // zIndex: 9999,
            opacity: state.isDisabled ? ".5" : "1",
            cursor: state.isDisabled ? "not-allowed" : "default",
            // backgroundColor: theme === "dark" ? "#0D1526" : "#fff",
            "&:hover": {
              border: `2px solid ${themeColor.primary}`,
              outlineColor: themeColor.primary,
            },
            width: "100%",
          }),
        }}
      />
    </main>
  );
};

export default CSelect;
