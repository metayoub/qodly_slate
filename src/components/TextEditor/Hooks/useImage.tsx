import { Editor, Transforms, Descendant, Element as SlateElement } from 'slate';

export type ImageElement = { type: 'image'; url: string; children: Descendant[] };

const useImage = () => {
  const isImageActive = (editor: Editor) => {
    const [image] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ImageElement).type === 'image',
    });
    return !!image;
  };

  const unwrapImage = (editor: Editor) => {
    // Transforms.removeNodes(editor, { at: path })
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ImageElement).type === 'image',
      split: true,
    });
  };

  const wrapImage = (editor: Editor, url: string, text?: string) => {
    if (isImageActive(editor)) {
      unwrapImage(editor);
    }

    const embedElement: ImageElement = {
      type: 'image',
      url,
      children: [{ text: text || '' }],
    };
    Transforms.insertNodes(editor, embedElement);
  };

  const insertImage = (editor: Editor, url: string, text?: string) => {
    wrapImage(editor, url, text);
  };

  return {
    isImageActive,
    unwrapImage,
    wrapImage,
    insertImage,
  };
};

export default useImage;
