import { IconType } from 'react-icons';
import { Button } from './';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { FC } from 'react';
interface BlockButton {
  icon: IconType;
  format: string;
  readonly?: boolean;
}

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const BlockButton: FC<BlockButton> = ({ icon: Icon, format, readonly }) => {
  const editor = useSlate();
  const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
      }),
    );

    return !!match;
  };

  const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
    );
    const isList = LIST_TYPES.includes(format);
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
    if (format === 'code' && !isBlockActive(editor, format, 'type')) {
      let property = 'language';
      Transforms.setNodes(editor, { [property]: undefined });
    }
  };

  return (
    <Button
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
      onMouseDown={(event) => {
        event.preventDefault();
        !readonly && toggleBlock(editor, format);
      }}
    >
      <Icon />
    </Button>
  );
};

export default BlockButton;
