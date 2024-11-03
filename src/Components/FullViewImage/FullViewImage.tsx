import { Show } from "easy-beauty-components---react";
import React from "react";

const FullViewImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <>
      <Show when={selectedImage ? true : false}>
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={selectedImage || undefined}
              alt="Selected Product"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-red-800 rounded-full w-8 h-8 focus:outline-none "
            >
              ✕
            </button>
          </div>
        </section>
      </Show>
    </>
  );
};

export default FullViewImage;
