import { FC, useState } from 'react';
import { Button } from '.';
import { IconType } from 'react-icons';
import useLink from '../Hooks/useLink'; // Adjust the import path accordingly
import { ReactEditor, useSlate } from 'slate-react';
import { createPortal } from 'react-dom';
import LinkDialog from './LinkDialog';
import { BaseRange } from 'slate';

interface LinkButton {
  icon: IconType;
  readonly?: boolean;
}

const LinkButton: FC<LinkButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();
  const { isLinkActive, unwrapLink, insertLink } = useLink();
  const [showDialog, setShowDialog] = useState(false);
  const [selection, setSelection] = useState<BaseRange | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

  const handleMouseDown = (event: any) => {
    if (readonly) return;
    event.preventDefault();

    if (isLinkActive(editor)) {
      unwrapLink(editor);
    } else {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        setDialogPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        setSelection(editor.selection);
        setShowDialog(true);
      }
    }
  };

  const handleInsertLink = (url: string) => {
    console.log('handleInsertLink', editor.selection);
    ReactEditor.focus(editor as ReactEditor);
    editor.selection = selection;
    insertLink(editor, url);
    setShowDialog(false);
  };

  return (
    <>
      <Button active={isLinkActive(editor)} onMouseDown={handleMouseDown}>
        <Icon />
      </Button>
      {showDialog &&
        dialogPosition &&
        createPortal(
          <LinkDialog
            position={dialogPosition}
            onClose={() => {
              setShowDialog(false);
            }}
            onInsertLink={handleInsertLink}
          />,
          document.body,
        )}
    </>
  );
};

export default LinkButton;
