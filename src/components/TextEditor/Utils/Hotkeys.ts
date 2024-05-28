import isHotkey from 'is-hotkey';
import { Editor } from 'slate';
import useButton from '../Hooks/useButton';

const handleHotKey = (editor: Editor, event: any) => {
  const HOTKEYS = {
    'ctrl+b': 'bold',
    'ctrl+i': 'italic',
    'ctrl+u': 'underline',
    'ctrl+`': 'code',
  };

  const { toggleMark } = useButton();

  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = (HOTKEYS as any)[hotkey];
      toggleMark(editor, mark);
    }
  }
};

export default handleHotKey;
