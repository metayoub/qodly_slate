import { Editor, Transforms, Descendant, Element as SlateElement, Range } from 'slate';

export type VideoElement = { type: 'video'; url: string; children: Descendant[] };

const useVideo = () => {
  const isVideoActive = (editor: Editor) => {
    const [video] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as VideoElement).type === 'video',
    });
    return !!video;
  };

  const unwrapVideo = (editor: Editor) => {
    // TODO: not working, mayb be using // Transforms.removeNodes(editor, { at: path }) will fix it
    Transforms.delete(editor, {
      at: editor.selection as Range,
    });
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as VideoElement).type === 'video',
      split: true,
    });
    // Optionally, you can add a normalization step to ensure the editor's structure is valid.
    Editor.normalize(editor, { force: true });
  };

  const wrapVideo = (editor: Editor, url: string, text?: string) => {
    if (isVideoActive(editor)) {
      unwrapVideo(editor);
    }

    const embedElement: VideoElement = {
      type: 'video',
      url,
      children: [{ text: text || url }],
    };
    Transforms.insertNodes(editor, embedElement);
  };

  const insertVideo = (editor: Editor, url: string, text?: string) => {
    wrapVideo(editor, url, text);
  };

  return {
    unwrapVideo,
    wrapVideo,
    insertVideo,
    isVideoActive,
  };
};

export default useVideo;
