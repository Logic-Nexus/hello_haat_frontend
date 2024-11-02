// StyledTableHeader.tsx
import React, { forwardRef } from "react";
// import Checkbox from './Checkbox';
// import StyledTableHeader from './StyledTableHeader';
import textFormatter from "text-formatter-js";
import "./table.css";

interface StyledTableHeaderProps {
  children: React.ReactNode;
  headerAlign?: string[];
  sticky?: boolean;
  style?: React.CSSProperties;
}

const StyledTableHeader: React.FC<StyledTableHeaderProps> = ({
  children,
  // headerAlign,
  sticky,
  style,
}) => (
  <thead
    className="header"
    style={{ position: sticky ? "sticky" : "static", top: 0, ...style }}
  >
    <tr>{children}</tr>
  </thead>
);

interface CheckboxProps {
  onChange?: () => void;
  checked?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  checked,
  className,
}) => (
  <input
    type="checkbox"
    onChange={onChange}
    checked={checked}
    className={className}
  />
);

interface MainTableProps {
  titles?: string[];
  data?: Record<string, any>[];
  align?: string;
  headerAlign?: string[];
  filter?: boolean;
  children?: React.ReactNode;
  inactiveIndexes?: number[];
  bulkSelection?: boolean;
  onSelectAllClick?: () => void;
  checked?: boolean;
  showZero?: boolean;
  inactiveRowColor?: string;
  tableHeaderDesign?: React.CSSProperties;
  dense?: boolean;
  bodyStyle?: React.CSSProperties;
  sticky?: boolean;
  [key: string]: any;
}

const MainTable = forwardRef<HTMLTableElement, MainTableProps>(
  (
    {
      titles = [],
      data = [],
      align = "left",
      headerAlign = [],
      filter = false,
      children,
      inactiveIndexes = [],
      bulkSelection = false,
      onSelectAllClick,
      checked = false,
      showZero = false,
      inactiveRowColor = "#DDDDDD",
      tableHeaderDesign = {},
      dense = false,
      bodyStyle = {},
      sticky = false,
      ...rest
    },
    ref
  ) => {
    const isInactiveRow = (index: number) => inactiveIndexes.includes(index);

    return (
      <div
        className="w-full overflow-x-auto"
        // style={{
        //   width: "calc(100vw - 22rem)",
        // }}
      >
        <table
          {...rest}
          ref={ref}
          className="min-w-full border-collapse text-sm "
        >
          <StyledTableHeader
            headerAlign={headerAlign}
            sticky={sticky}
            style={tableHeaderDesign}
          >
            {bulkSelection && (
              <th className="p-2">
                <Checkbox
                  onChange={onSelectAllClick}
                  checked={checked}
                  className="header-checkbox"
                />
              </th>
            )}
            {filter && data.length > 0
              ? Object.keys(data[0]).map((key, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-center text-xs font-semibold bg-primary text-white"
                    style={{
                      textAlign: headerAlign[i] || "center",
                      ...tableHeaderDesign,
                    }}
                  >
                    {textFormatter(key)}
                  </th>
                ))
              : titles?.map((title: string, id: number) => (
                  <th
                    key={id}
                    className="px-3 py-2 text-center text-xs font-semibold bg-primary text-white"
                    style={{
                      textAlign: headerAlign[id] || "center",
                      ...tableHeaderDesign,
                    }}
                  >
                    {title}
                  </th>
                ))}
          </StyledTableHeader>
          <tbody>
            {data?.length > 0 ? (
              data?.map((item: any, i: number) => (
                <tr
                  key={i}
                  className={`${
                    isInactiveRow(i)
                      ? "bg-gray-300 text-gray-600"
                      : i % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                  style={{
                    color: isInactiveRow(i) ? "white" : "black",
                    textAlign: align,
                    ...bodyStyle,
                  }}
                >
                  {bulkSelection && (
                    <td className="p-2 text-center">
                      <Checkbox
                        onChange={() => {}}
                        checked={checked}
                        className="body-checkbox"
                      />
                    </td>
                  )}

                  {Object.keys(item).map((key, j) => (
                    <td
                      key={j}
                      className={`px-3 py-2 ${
                        dense ? "p-1 text-xs" : "text-sm"
                      }`}
                    >
                      {item[key] ? item[key] : showZero ? 0 : "N/A"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={titles.length} className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {children}
      </div>
    );
  }
);

MainTable.displayName = "MainTable";

export default MainTable;
