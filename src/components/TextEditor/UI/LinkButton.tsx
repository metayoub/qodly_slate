import { FC } from 'react';
import { Button } from '.';
import { IconType } from 'react-icons';
import useLink from '../Hooks/useLink'; // Adjust the import path accordingly
import { useSlate } from 'slate-react';

interface LinkButton {
  icon: IconType;
  readonly?: boolean;
  format: string;
}

const LinkButton: FC<LinkButton> = ({ icon: Icon, format, readonly }) => {
  const editor = useSlate();
  const { isLinkActive, unwrapLink, insertLink } = useLink();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event: any) => {
        if (readonly) return;
        event.preventDefault();

        if (format === 'add') {
          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          insertLink(editor, url);
        }

        if (format === 'delete') {
          if (isLinkActive(editor)) {
            unwrapLink(editor);
          }
        }
      }}
    >
      <Icon />
    </Button>
  );
};

export default LinkButton;
