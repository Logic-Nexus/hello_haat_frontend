import React from "react";

interface props {
  title?: string;
}

const NotFoundData = ({ title }: props) => {
  return (
    <main className="flex items-center justify-center h-full text-center w-full">
      <div className="text-xl font-bold text-gray-400">
        No {title || "Data"} Found
      </div>
    </main>
  );
};

export default NotFoundData;
