import { useSlate } from 'slate-react';
import { Button } from './';
import { IconType } from 'react-icons';
import { FC } from 'react';
import useButton from '../Hooks/useButton';
interface MarkButton {
  icon: IconType;
  format: string;
  readonly?: boolean;
}

const MarkButton: FC<MarkButton> = ({ icon: Icon, format, readonly }) => {
  const editor = useSlate();
  const { isMarkActive, toggleMark } = useButton();
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
