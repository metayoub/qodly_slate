import isUrl from 'is-url';
import { Editor } from 'slate';
import useLink from './useLink';

export const withInlines = (editor: Editor) => {
  const { insertText, isInline } = editor;
  const { wrapLink } = useLink();

  editor.isInline = (element: any) => ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  return editor;
};
