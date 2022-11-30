function getCommands(data = [], resulte = {}) {
  data.forEach((item) => {
    if (item.children && Array.isArray(item.children)) {
      resulte = { ...resulte, ...getCommands(item.children || []) };
    } else if (item.keyCommand && item.shortcuts && item.execute) {
      resulte[item.shortcuts.toLocaleLowerCase()] = item;
    }
  });
  return resulte;
}

export default function shortcutsHandle(
  e,
  commands = [],
  commandOrchestrator,
  dispatch,
  state
) {
  const data = getCommands(commands || []);
  const shortcuts = [];
  if (e.altKey) {
    shortcuts.push("alt");
  }
  if (e.shiftKey) {
    shortcuts.push("shift");
  }
  if (e.metaKey) {
    shortcuts.push("cmd");
  }
  if (e.ctrlKey) {
    shortcuts.push("ctrl");
  }
  if (
    shortcuts.length > 0 &&
    !/(control|alt|meta|shift)/.test(e.key.toLocaleLowerCase())
  ) {
    shortcuts.push(e.key.toLocaleLowerCase());
  }
  if (/escape/.test(e.key.toLocaleLowerCase())) {
    shortcuts.push("escape");
  }
  if (shortcuts.length < 1) {
    return;
  }
  let equal = !!data[shortcuts.join("+")];
  let command = equal ? data[shortcuts.join("+")] : undefined;

  Object.keys(data).forEach((item) => {
    const isequal = item.split("+").every((v) => {
      if (/ctrlcmd/.test(v)) {
        return shortcuts.includes("ctrl") || shortcuts.includes("cmd");
      }
      return shortcuts.includes(v);
    });
    if (isequal) {
      command = data[item];
    }
  });
  if (command && commandOrchestrator) {
    e.stopPropagation();
    e.preventDefault();
    commandOrchestrator.executeCommand(command, dispatch, state, shortcuts);
    return;
  }
}
