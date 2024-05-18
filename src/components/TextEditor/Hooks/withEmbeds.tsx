import { Editor } from 'slate';

const withEmbeds = (editor: Editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element: any) => {
    return element.type === 'video' ? true : isVoid(element);
  };
  return editor;
};

export default withEmbeds;
