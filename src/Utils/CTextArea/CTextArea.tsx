import React from "react";

interface CTextAreaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: any;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  disabled?: boolean;
  required?: boolean;
  label?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  rows?: number;
}

const CTextArea = ({
  id = "",
  name = "",
  placeholder = "",
  className = "",
  value,
  onChange,
  label,
  disabled = false,
  defaultValue,
  width,
  height,
  rows,
}: CTextAreaProps) => {
  // const { theme } = useTheme();
  return (
    <section>
      <label
        htmlFor={label?.toLowerCase()}
        className="level text-sm text-gray-500 mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`${className && className} ${width ? width : "w-full"} ${
          height ? height : "h-20"
        }  "border-1 border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:bg-black/10 focus:border-transparent placeholder:italic placeholder:text-sm "  ${
          disabled && "opacity-20 cursor-not-allowed dark:bg-black/20"
        }`}
        style={
          {
            // backgroundColor: theme === "dark" ? "#0D1526" : "#fff",
          }
        }
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
      />
    </section>
  );
};

export default CTextArea;
