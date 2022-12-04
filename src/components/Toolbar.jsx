import { useContext } from "react";
import { getCommands } from "../commands";
import { EditorContext } from "../Context";

const Toolbar = () => {
  const { commandOrchestrator } = useContext(EditorContext);
  const handler = (command) => {
    commandOrchestrator && commandOrchestrator.executeCommand(command);
  };

  return (
    <div className="flex items-center gap-2 mb-3">
      {getCommands().map((command) => {
        return (
          command.keyCommand !== "divider" && (
            <button
              className="iconBtn"
              title={command.buttonProps.title}
              key={command.name}
              onClick={() => handler(command)}
            >
              {command.icon}
            </button>
          )
        );
      })}
    </div>
  );
};

export default Toolbar;
