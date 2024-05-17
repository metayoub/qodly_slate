import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { Editor, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar, Element, Leaf } from './UI';
import isUrl from 'is-url';
import './TextEditor.css';
import useLink from './Hooks/useLink';

const TextEditor: FC<ITextEditorProps> = ({ name, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [_value, setValue] = useState(() => name);
  const {
    sources: { datasource: ds },
  } = useSources();
  const { wrapLink } = useLink();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  const withInlines = (editor: Editor) => {
    const { insertText, isInline } = editor;

    editor.isInline = (element: any) => ['link'].includes(element.type) || isInline(element);

    editor.insertText = (text) => {
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };

    return editor;
  };

  const [editor] = useState(() => withInlines(withReact(createEditor())));

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v || name);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  return (
    <div
      ref={connect}
      style={style}
      className={cn(className, classNames, 'border border-gray-300 rounded-md')}
    >
      <Slate editor={editor as ReactEditor} initialValue={initialValue}>
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
