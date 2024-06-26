import isHotkey from 'is-hotkey';
import { Editor } from 'slate';
import useButton from '../Hooks/useButton';
import { HistoryEditor } from 'slate-history';

const handleHotKey = (editor: Editor, event: any) => {
  const HOTKEYS = {
    'ctrl+b': 'bold',
    'ctrl+i': 'italic',
    'ctrl+u': 'underline',
    'ctrl+`': 'code',
    'ctrl+z': 'undo',
    'ctrl+y': 'redo',
  };

  const { toggleMark } = useButton();
  
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      if (hotkey === 'ctrl+z') {
        HistoryEditor.undo(editor as any);
      } else if (hotkey === 'ctrl+y') {
        HistoryEditor.redo(editor as any);
      } else {
        const mark = (HOTKEYS as any)[hotkey];
        toggleMark(editor, mark);
      }
    }
  }
};

export default handleHotKey;
