import { Show } from "easy-beauty-components---react";
import React from "react";

const SubCard = ({
  children,
  title,
  secondary,
}: React.PropsWithChildren<{
  title?: React.ReactNode;
  secondary?: React.ReactNode;
}>) => {
  return (
    <main className="shadow rounded-md bg-white p-4 mb-4 dark:bg-dark dark:border dark:border-gray-800">
      <Show when={(title as any) || secondary}>
        <section className="flex justify-between items-center">
          <aside>
            {title && (
              <h2 className="text-left md:text-base text-xs md:mb-4 mb-2">
                {title}
              </h2>
            )}
          </aside>
          <div>{secondary && secondary}</div>
        </section>
        <hr className="mb-3" />
      </Show>
      {children && children}
    </main>
  );
};

export default SubCard;
