import { useSlate } from 'slate-react';
import { Button } from './';
import { IconType } from 'react-icons';
import { Editor } from 'slate';
import { FC } from 'react';
interface MarkButton {
  icon: IconType;
  format: string;
  readonly?: boolean;
}

const MarkButton: FC<MarkButton> = ({ icon: Icon, format, readonly }) => {
  const editor = useSlate();
  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, any>;
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        !readonly && toggleMark(editor, format);
      }}
    >
      <Icon />
    </Button>
  );
};

export default MarkButton;
