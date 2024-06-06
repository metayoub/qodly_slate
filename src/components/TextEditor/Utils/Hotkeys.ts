import { Editor, Transforms } from 'slate';

const handleHotKey = (editor: Editor, event: any) => {
  const { selection } = editor;
  const { children } = editor;

  //inside code + enter clicked
  if (
    selection &&
    (children[selection?.anchor.path[0]] as any).type === 'code' &&
    event.code === 'Enter'
  ) {
    event.preventDefault();
    Transforms.insertText(editor, '\n', { at: selection });
  }
};

export default handleHotKey;
