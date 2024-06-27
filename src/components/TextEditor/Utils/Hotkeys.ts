import isHotkey from 'is-hotkey';
import { Editor, Transforms } from 'slate';
import useButton from '../Hooks/useButton';

const handleHotKey = (editor: Editor, event: any) => {
  const { selection } = editor;
  const { children } = editor;
  const { toggleMark } = useButton();
  const HOTKEYS = {
    'ctrl+b': 'bold',
    'ctrl+i': 'italic',
    'ctrl+u': 'underline',
    'ctrl+`': 'code',
  };

  if (
    selection &&
    (children[selection?.anchor.path[0]] as any).type === 'code' &&
    event.code === 'Enter'
  ) {
    event.preventDefault();
    Transforms.insertText(editor, '\n', { at: selection });
  }

  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = (HOTKEYS as any)[hotkey];
      toggleMark(editor, mark);
    }
  }
};

export default handleHotKey;
