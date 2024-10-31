"use client";
import React from "react";

import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

interface AccordionLayoutProps {
  title: string;
  children: React.ReactNode;
  index: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  created_at?: string;
}

const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
  created_at,
}: AccordionLayoutProps) => {
  const handleSetIndex = (index: any) => {
    activeIndex !== index && setActiveIndex(index);
  };

  return (
    <>
      <div className="w-full my-1 flex flex-col justify-center items-center rounded-lg border border-gray-200 dark:border-light-primary">
        <div
          className={`
           w-full flex flex-row justify-between items-center px-5 py-3 cursor-pointer
          rounded-lg transition-all duration-500 ease-in-out 
            ${
              activeIndex === index
                ? "bg-cyan-950 text-white dark:bg-dark-primary"
                : "bg-dark-primary text-stone-600 dark:bg-cyan-950"
            }
          `}
          onClick={() => handleSetIndex(index)}
        >
          <h2 className="text-sm font-bold text-white uppercase">{title}</h2>
          {activeIndex === index ? (
            <BsFillArrowUpCircleFill className="text-2xl text-white animate-animate-bounce " />
          ) : (
            <BsFillArrowDownCircleFill className="text-2xl text-white animate-animate-bounce " />
          )}
        </div>
        {activeIndex === index && (
          <div
            className="w-full flex flex-col justify-center  px-5 py-8 bg-white
          transition-all duration-500 ease-in-out rounded-b-lg dark:bg-dark"
            style={{
              height: "auto",
            }}
          >
            <p className="text-sm font-medium text-stone-600 dark:text-white group flex relative flex-col">
              {children}
              {/* //created at  */}
              {created_at && (
                <span className="text-xs text-gray-400 mt-5">
                  Created at: {""}
                  {created_at?.split?.("T")?.[0]}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AccordionLayout;
