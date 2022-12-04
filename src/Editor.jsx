import { useReducer, useRef, useEffect } from "react";
import { TextAreaCommandOrchestrator } from "./commands";
import handleKeyDown from "./components/handleKeyDown";
import shortcutsHandle from "./components/shortcuts";
import { EditorContext, reducer } from "./Context";
import { getCommands, getExtraCommands } from "./commands";
import Toolbar from "./components/Toolbar";

const Editor = ({
  value,
  defaultTabEnable = false,
  fullscreen = false,
  preview = false,
  onChange,
  tabSize = 2,
}) => {
  const textRef = useRef(null);
  const commands = getCommands();
  const extraCmds = getExtraCommands();
  const [state, dispatch] = useReducer(reducer, {
    markdown: value,
    defaultTabEnable,
    commands: commands,
    extraCommands: extraCmds,
  });

  const executeRef = useRef();
  const statesRef = useRef({ fullscreen, preview });

  useEffect(() => {
    statesRef.current = { fullscreen, preview };
  }, [fullscreen, preview]);

  useEffect(() => {
    if (textRef.current && dispatch) {
      const commandOrchestrator = new TextAreaCommandOrchestrator(
        textRef.current
      );
      executeRef.current = commandOrchestrator;
      dispatch({ textarea: textRef.current, commandOrchestrator });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e) => {
    handleKeyDown(e, tabSize, defaultTabEnable);
    shortcutsHandle(
      e,
      [...(commands || []), ...(extraCmds || [])],
      executeRef.current,
      dispatch,
      statesRef.current
    );
  };
  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener("keydown", onKeyDown);
    }
    return () => {
      if (textRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        textRef.current.removeEventListener("keydown", onKeyDown);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      <div className="container relative">
        <Toolbar />

        <textarea
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          ref={textRef}
          value={state.markdown}
          onChange={(e) => {
            dispatch && dispatch({ markdown: e.target.value });
            onChange && onChange(e);
          }}
        />
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;

// Link ma url ma
