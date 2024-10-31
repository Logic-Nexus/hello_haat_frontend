"use client";
import React from "react";
import { Tooltip } from "react-tooltip";

interface Props {
  id?: string;
  customClass?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  btnTitle?: string | React.ReactNode;
  textUpperCased?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  variant: "solid" | "outline" | "text" | "contained";
  fontSize?: string;
  fontStyle?: string;
  gap?: string;
  onClick?: () => void;
  rest?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDoubleClick?: () => void;
  loading?: boolean;
  circle?: boolean;
  paddingNone?: boolean;
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
  tooltipVariant?: "error" | "dark" | "success" | "primary" | "info" | "light";
  className?: string;
}

const CButton = ({
  circle,
  customClass,
  className,
  fullWidth,
  fontSize,
  gap,
  fontStyle,
  type,
  btnTitle,
  textUpperCased,
  children,
  disabled,
  color,
  variant,
  onClick,
  loading,
  paddingNone,
  tooltip,
  tooltipPosition = "bottom",
  tooltipContent = "",
  tooltipVariant = "dark",
  id,
  ...rest
}: Props) => {
  // const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <section data-tooltip-id={id}>
      <button
        className={
          customClass
            ? customClass
            : ` ${className} ${
                paddingNone ? "p-2" : "md:px-3 md:py-2  px-2 py-1"
              } 
              ${circle ? "rounded-full w-10 h-10" : ""}
              ${fontSize ? fontSize : "text-[0.75rem] sm:text-sm"}
              ${fontStyle ? fontStyle : "font-semibold"}
              transition-all
              flex
              items-center
              justify-center
              ${gap ? gap : "gap-1"}
              ring-1
              ring-transparent
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:ring-opacity-50
              
              
            ${fullWidth ? "w-full" : ""} 
            ${textUpperCased ? "uppercase" : ""}
            ${
              disabled || loading
                ? `opacity-50 cursor-not-allowed hover:opacity-50 
                hover:cursor-not-allowed hover:bg-transparent hover:text-light_text_color dark:hover:text-light_text_color
                `
                : "cursor-pointer"
            }

            ${
              variant === "text"
                ? `bg-transparent outline-none focus:outline-none border-0 ${
                    color
                      ? color
                      : "text-light_text_color dark:text-light_text_color"
                  } `
                : ""
            }
            ${
              variant === "contained"
                ? `${color ? color : "bg-primary text-light_text_color "}
                  ${circle ? "rounded-full" : "rounded-md"}
                  hover:bg-primary/90  hover:text-light_text_color transition-all duration-500`
                : ""
            }
              
              ${
                variant === "outline"
                  ? `${
                      color
                        ? color
                        : "border-[0.0625rem] border-primary text-primary hover:bg-primary rounded-md hover:text-light_text_color transition-all duration-500"
                    }
                  
                 hover:bg-primary/90 `
                  : ""
              }

              ${
                variant === "solid"
                  ? `${
                      color
                        ? color
                        : "border-[0.0625rem] border-primary text-primary hover:bg-primary rounded-md hover:text-light_text_color transition-all duration-500 outline-none focus:outline-none"
                    }
                  
                  `
                  : ""
              }
              `
        }
        onClick={onClick}
        style={
          {
            // ...(variant === "solid" && {
            //   backgroundColor: color,
            //   color: "#fff",
            // }),
            // ...(variant === "outline" && {
            //   border: isHovered ? `1px solid #fff` : `1px solid ${color}`,
            //   color: isHovered ? "#fff" : `rgba(0, 0, 0, 0.87)`,
            //   backgroundColor: isHovered ? color : "transparent",
            // }),
            // ...(variant === "text" && {
            //   color: color,
            //   backgroundColor: "transparent",
            // }),
          }
        }
        type={type}
        disabled={disabled || loading}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        )}

        {!loading && (children || btnTitle)}
      </button>
      {tooltip && (
        <Tooltip
          id={id}
          place={tooltipPosition as any}
          content={tooltipContent as any}
          variant={tooltipVariant as any}
          opacity={1}
        />
      )}
    </section>
  );
};

export default CButton;
