import { IconType } from 'react-icons';
import { Button } from './';
import { useSlate } from 'slate-react';
import { FC } from 'react';
import { Editor, Transforms } from 'slate';
import has from 'lodash/has';

interface ClearButton {
  icon: IconType;
  readonly?: boolean;
}

const ClearButton: FC<ClearButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();

  const clearContent = (editor: Editor) => {
    const { selection } = editor;

    if (selection) {
      const textMarks = [
        'bold',
        'italic',
        'underline',
        'code',
        'strikethrough',
        'color',
        'backgroundColor',
      ];

      Transforms.unsetNodes(editor, textMarks, {
        match: (n) => {
          return has(n, 'text');
        },
        split: false,
      });
      // TODO : remove link
    }
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        !readonly && clearContent(editor);
      }}
    >
      <Icon />
    </Button>
  );
};

export default ClearButton;
