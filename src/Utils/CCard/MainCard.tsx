import { Show } from "easy-beauty-components---react";
import React from "react";

const MainCard = ({
  children,
  title,
  secondary,
  filter,
}: React.PropsWithChildren<{
  title?: React.ReactNode;
  secondary?: React.ReactNode;
  filter?: React.ReactNode;
}>) => {
  return (
    <main className="shadow rounded-md bg-white p-4 my-2 dark:bg-dark dark:border dark:border-gray-800 mx-1">
      <Show when={title || secondary ? true : false}>
        <section className="flex justify-between items-center">
          <aside>
            {title && (
              <h2 className="text-left md:text-base font-bold text-xs md:mb-4 mb-2">
                {title}
              </h2>
            )}
          </aside>
          <aside>{filter && filter}</aside>
          <div>{secondary && secondary}</div>
        </section>
        <hr className="mb-3 mt-1" />
      </Show>
      {children && children}
    </main>
  );
};

export default MainCard;
