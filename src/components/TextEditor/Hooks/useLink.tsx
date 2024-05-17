import { useCallback } from 'react';
import { Editor, Transforms, Range, Descendant, Element as SlateElement } from 'slate';

// Define the LinkElement type
export type LinkElement = { type: 'link'; url: string; children: Descendant[] };

const useLink = () => {
  const isLinkActive = useCallback((editor: Editor) => {
    const [link] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as LinkElement).type === 'link',
    });
    return !!link;
  }, []);

  const unwrapLink = useCallback((editor: Editor) => {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as LinkElement).type === 'link',
    });
  }, []);

  const wrapLink = useCallback(
    (editor: Editor, url: string, text?: string) => {
      if (isLinkActive(editor)) {
        unwrapLink(editor);
      }

      const { selection } = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      const link: LinkElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: text || url }] : [],
      };

      if (isCollapsed) {
        Transforms.insertNodes(editor, link);
      } else {
        Transforms.wrapNodes(editor, link, { split: true });
        if (text) {
          Transforms.insertText(editor, text);
        }
        Transforms.collapse(editor, { edge: 'end' });
      }
    },
    [isLinkActive, unwrapLink],
  );

  const insertLink = useCallback(
    (editor: Editor, url: string) => {
      if (editor.selection) {
        wrapLink(editor, url);
      }
    },
    [wrapLink],
  );

  return {
    isLinkActive,
    unwrapLink,
    wrapLink,
    insertLink,
  };
};

export default useLink;
