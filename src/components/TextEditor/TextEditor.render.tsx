import { splitDatasourceID, useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState, useRef, MutableRefObject } from 'react';
import { Descendant, Transforms, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar, Element, Leaf } from './UI';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { withHistory } from 'slate-history';
import withEmbeds from './Hooks/withEmbeds';
import useCodeEditor from './Hooks/useCodeEditor';
import withInlines from './Hooks/withInlines';
import handleHotKey from './Utils/Hotkeys';
import isEqual from 'lodash/isEqual';
const TextEditor: FC<ITextEditorProps> = ({
  datasource,
  readOnly,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
  const [value, updateValue] = useState<Descendant[] | null>(null);

  const setValue = (newValue: Descendant[]) => {
    // compare contents then update to avoid infinite loop
    if (!isEqual(newValue, value)) {
      editor.children = newValue;
      updateValue(newValue);
    }
  };

  const {
    sources: { datasource: ds },
  } = useSources();

  const { id: datasourceID } = splitDatasourceID(datasource);
  const editorWrapperRef = useRef<HTMLDivElement | null>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>; // Explicitly type as MutableRefObject
  const [editor] = useState(() => withInlines(withReact(withHistory(withEmbeds(createEditor())))));

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const { highlightCode } = useCodeEditor();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      try {
        const parsedValue = v ? JSON.parse(v) : initialValue;
        setValue(parsedValue);
      } catch (error) {
        const slateContent = [{ type: 'paragraph', children: [{ text: v }] }];
        setValue(slateContent);
      }
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorWrapperRef.current && !editorWrapperRef.current.contains(event.target as Node)) {
        Transforms.deselect(editor);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editorWrapperRef]);

  const handleOnChange = (newValue: any) => {
    if (ds && !datasourceID.startsWith('$')) {
      //you can only set the value on non iterator ds
      ds.setValue(null, JSON.stringify(newValue));
    }
  };

  const handlePaste = useCallback(
    (event: any) => {
      //used to consider pasted lines as one block
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      const formattedText = text.split('\n').join('\n');
      const newContent = {
        type: 'paragraph',
        children: [{ text: formattedText }],
      };
      Transforms.insertNodes(editor, newContent);
    },
    [editor],
  );

  // TODO: dynamic padding
  return (
    <div
      ref={(node) => {
        editorWrapperRef.current = node;
        connect(node);
      }}
      style={style}
      className={cn(className, classNames)}
    >
      {value ? (
        <Slate editor={editor as ReactEditor} initialValue={value} onChange={handleOnChange}>
          {!readOnly && <Toolbar readonly={readOnly} />}
          <Editable
            className="p-2"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly={readOnly}
            decorate={highlightCode}
            onPaste={handlePaste}
            onKeyDown={(e) => handleHotKey(editor, e)}
          />
        </Slate>
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
          <BsFillInfoCircleFill className="mb-1 h-8 w-8" />
          <p>Please attach a datasource</p>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
