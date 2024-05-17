import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar } from './UI';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];
const TextEditor: FC<ITextEditorProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div
      ref={connect}
      style={style}
      className={cn(className, classNames, 'border border-gray-300 rounded-md')}
    >
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar readonly></Toolbar>
        <Editable readOnly className="p-2 h-full" />
      </Slate>
    </div>
  );
};

export default TextEditor;
