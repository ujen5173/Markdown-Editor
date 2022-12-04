import React from "react";
import ReactMarkdown from "@uiw/react-markdown-preview";

const Preview = ({ markdown }) => {
  return (
    <div className="text-gray-100 max-h-[500px] overflow-auto ">
      <ReactMarkdown source={markdown || ""} />
    </div>
  );
};

export default Preview;
