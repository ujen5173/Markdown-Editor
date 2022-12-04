import * as React from "react";
import handleReverse from "../utils/handleReverse.jsx";
import { selectWord } from "../utils/markdownUtils.js";

export const italic = {
  name: "italic",
  keyCommand: "italic",
  shortcuts: "ctrlcmd+i",
  value: "_ _",
  buttonProps: {
    "aria-label": "Add italic text (ctrl + i)",
    title: "Add italic text (ctrl + i)",
  },
  icon: (
    <svg
      data-name="italic"
      width="12"
      height="12"
      role="img"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M204.758 416h-33.849l62.092-320h40.725a16 16 0 0 0 15.704-12.937l6.242-32C297.599 41.184 290.034 32 279.968 32H120.235a16 16 0 0 0-15.704 12.937l-6.242 32C96.362 86.816 103.927 96 113.993 96h33.846l-62.09 320H46.278a16 16 0 0 0-15.704 12.935l-6.245 32C22.402 470.815 29.967 480 40.034 480h158.479a16 16 0 0 0 15.704-12.935l6.245-32c1.927-9.88-5.638-19.065-15.704-19.065z"
      />
    </svg>
  ),
  execute: (state, api) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);

    if (handleReverse(/^_.*_$/, api, state1, 1, 1)) {
      return;
    }

    // Replaces the current selection with the italic mark up
    const state2 = api.replaceSelection(`_${state1.selectedText}_`);
    // Adjust the selection to not contain the *
    api.setSelectionRange({
      start: state2.selection.end - 2 - state1.selectedText.length,
      end: state2.selection.end,
    });
  },
};
