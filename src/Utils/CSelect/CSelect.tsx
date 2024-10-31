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
    <div className="">
      <label
        htmlFor={label?.toLowerCase()}
        className="level text-sm text-gray-500"
      >
        {label}
      </label>

      <Select
        name={name}
        id={id}
        className={`${className} ${
          width ? width : "w-full"
        }  border-0 border-dark-primary rounded-md outline-none focus:ring-2 focus:bg-primary focus:border-transparent dark:bg-black/10`}
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
            zIndex: 999,
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
    </div>
  );
};

export default CSelect;
