import { FC, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseRange } from 'slate';
import { IconType } from 'react-icons';
import { Button } from './';
import useImage from '../Hooks/useImage';
import ImageDialog from './ImageDialog';
import { createPortal } from 'react-dom';

interface ImageButton {
  icon: IconType;
  readonly?: boolean;
}

const ImageButton: FC<ImageButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();
  const { isImageActive, unwrapImage, insertImage } = useImage();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);
  const [selection, setSelection] = useState<BaseRange | null>(null);

  const handleMouseDown = (event: any) => {
    if (readonly) return;
    event.preventDefault();
    if (ReactEditor.isFocused(editor as ReactEditor)) {
      if (isImageActive(editor)) {
        unwrapImage(editor);
      } else {
        const domSelection = window.getSelection();
        if (domSelection && domSelection.rangeCount > 0) {
          const domRange = domSelection.getRangeAt(0);
          const rect = domRange.getBoundingClientRect();
          setSelection(editor.selection);
          setDialogPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          });
          setShowDialog(true);
        }
      }
    }
  };

  const handleInsertImage = (url: string) => {
    if (selection) {
      ReactEditor.focus(editor as ReactEditor);
      editor.selection = selection;
      insertImage(editor, url);
      setShowDialog(false);
    }
  };

  return (
    <>
      <Button active={isImageActive(editor)} onMouseDown={handleMouseDown}>
        <Icon />
      </Button>
      {showDialog &&
        dialogPosition &&
        createPortal(
          <ImageDialog
            position={dialogPosition}
            onClose={() => setShowDialog(false)}
            onInsertLink={handleInsertImage}
          />,
          document.body,
        )}
    </>
  );
};

export default ImageButton;
