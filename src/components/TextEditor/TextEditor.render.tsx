import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar, Element, Leaf } from './UI';

import './TextEditor.css';
import withInlines from './Hooks/withInlines';
import withEmbeds from './Hooks/withEmbeds';

const TextEditor: FC<ITextEditorProps> = ({ readOnly, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const {
    sources: { datasource: ds },
  } = useSources();

  const [editor] = useState(() => withInlines(withReact(withEmbeds(createEditor()))));

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      if (!v) return;
      try {
        const parsedValue = v ? JSON.parse(v) : initialValue;
        setValue(parsedValue);
      } catch (error) {
        const slateContent = [{ type: 'paragraph', children: [{ text: v }] }];
        setValue(slateContent);
      }
      setIsFirstLoad(true);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const handleOnChange = (newValue: any) => {
    if (ds) {
      ds.setValue(null, JSON.stringify(newValue));
    }
  };

  return (
    <div
      ref={connect}
      style={style}
      className={cn(className, classNames, 'border border-gray-300 rounded-md')}
    >
      {isFirstLoad && (
        <Slate editor={editor as ReactEditor} initialValue={value} onChange={handleOnChange}>
          <Toolbar></Toolbar>
          <Editable
            style={{ padding: '12px' }}
            className="p-2 h-full no-tailwind"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly={readOnly}
          />
        </Slate>
      )}
    </div>
  );
};

export default TextEditor;
