import { FC, useState } from 'react';
import { IconType } from 'react-icons';
import { Button } from './';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseRange } from 'slate';
import VideoDialog from './VideoDialog';
import { createPortal } from 'react-dom';
import useVideo from '../Hooks/useVideo';

interface VideoButton {
  icon: IconType;
  readonly?: boolean;
}

const VideoButton: FC<VideoButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();
  const { isVideoActive, unwrapVideo, insertVideo } = useVideo();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);
  const [selection, setSelection] = useState<BaseRange | null>(null);

  const handleMouseDown = (event: any) => {
    if (readonly) return;
    event.preventDefault();

    if (isVideoActive(editor)) {
      unwrapVideo(editor);
    } else {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        setSelection(editor.selection);
        setDialogPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        setShowDialog(true);
      }
    }
  };

  const handleInsertEmbed = (url: string) => {
    if (selection) {
      ReactEditor.focus(editor as ReactEditor);
      editor.selection = selection;
      insertVideo(editor, url);
      setShowDialog(false);
    }
  };

  return (
    <>
      <Button active={isVideoActive(editor)} onMouseDown={handleMouseDown}>
        <Icon />
      </Button>
      {showDialog &&
        dialogPosition &&
        createPortal(
          <VideoDialog
            position={dialogPosition}
            onClose={() => setShowDialog(false)}
            onInsertEmbed={handleInsertEmbed}
          />,
          document.body,
        )}
    </>
  );
};

export default VideoButton;
