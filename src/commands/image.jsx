import * as React from "react";
import { selectWord } from "../utils/markdownUtils.js";

export const image = {
  name: "image",
  keyCommand: "image",
  shortcuts: "ctrlcmd+k",
  value: "![image]()",
  buttonProps: {
    "aria-label": "Add image (ctrl + k)",
    title: "Add image (ctrl + k)",
  },
  icon: (
    <svg width="13" height="13" viewBox="0 0 20 20">
      <path
        fill="currentColor"
        d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
      />
    </svg>
  ),
  execute: (state, api) => {
    // Select everything
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);

    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";

    api.replaceSelection(`![](${imageTemplate})`);

    // Adjust the selection to not contain the **
    api.setSelectionRange({
      start: state1.selection.start + 4,
      // end: 5 + state1.selection.start + imageTemplate.length,
      end: 4 + state1.selection.end + imageTemplate.length,
    });
  },
};
