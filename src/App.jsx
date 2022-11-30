import { useState } from "react";
import Editor from "./Editor";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(
    "# Hello world! `This is code` *This is italic* **This is Bold**"
  );

  console.log({ value });

  return (
    <div className="container">
      <Editor
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default App;
