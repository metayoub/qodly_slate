import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar, Element, Leaf } from './UI';

import './TextEditor.css';
import withInlines from './Hooks/withInlines';
import withEmbeds from './Hooks/withEmbeds';

const TextEditor: FC<ITextEditorProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
  const [value, setValue] = useState(initialValue);
  const {
    sources: { datasource: ds },
  } = useSources();

  const [editor] = useState(() => withInlines(withReact(withEmbeds(createEditor()))));

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      try {
        const v = await ds.getValue<string>();
        const parsedValue = v ? JSON.parse(v) : initialValue;
        setValue(parsedValue);
      } catch (error) {
        console.error('Failed to parse value:', error);
        setValue(initialValue); // Fallback to initial value in case of error
      }
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const handleOnChange = (value: any) => {
    if (ds) {
      ds.setValue(null, JSON.stringify(value));
    }
  };

  return (
    <div
      ref={connect}
      style={style}
      className={cn(className, classNames, 'border border-gray-300 rounded-md')}
    >
      <Slate editor={editor as ReactEditor} initialValue={value} onChange={handleOnChange}>
        <Toolbar></Toolbar>
        <Editable
          style={{ padding: '12px' }}
          className="p-2 h-full no-tailwind"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
