import React from "react";
import ReactQuill from "react-quill";

interface props {
  handleEditorChange?: (e: any) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
}

const CTextEditor = ({
  handleEditorChange,
  placeholder,
  value,
  defaultValue,
  className,
}: props) => {
  return (
    <>
      <ReactQuill
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
        ]}
        onChange={(e) => handleEditorChange && handleEditorChange(e)}
        placeholder={placeholder}
        className="
                  py-2 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent dark:bg-black/10 mb-16
                  h-60
                "
        value={value}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default CTextEditor;
