import { useState } from "react";
import Editor from "./Editor";
import "./App.css";
import Preview from "./components/Preview";
import Toolbar from "./components/Toolbar";

const App = () => {
  const [value, setValue] = useState(
    "# Hello world! `This is code` *This is italic* **This is Bold**"
  );

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <Editor
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <Preview markdown={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
