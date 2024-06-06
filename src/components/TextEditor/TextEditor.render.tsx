import { splitDatasourceID, useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { ITextEditorProps } from './TextEditor.config';
import { Toolbar, Element, Leaf } from './UI';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import handleHotKey from './Utils/Hotkeys';
import { withHistory } from 'slate-history';

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

  const setValue = (value: Descendant[]) => {
    editor.children = value;
    updateValue(value);
  };

  const {
    sources: { datasource: ds },
  } = useSources();

  const { id: datasourceID } = splitDatasourceID(datasource);

  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

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

  useEffect(() => {
    //handles iterator datasource
    if (!ds || !datasourceID.startsWith('$')) return;
    listener();
  }, []);

  useEffect(() => {
    //handles standard ds
    if (!ds || datasourceID.startsWith('$')) return;
    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const handleOnChange = (newValue: any) => {
    if (ds && !datasourceID.startsWith('$')) {
      //you can only set the value on non iterator ds
      ds.setValue(null, JSON.stringify(newValue));
    }
  };

  // TODO: dynamic padding
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {value ? (
        <Slate editor={editor as ReactEditor} initialValue={value} onChange={handleOnChange}>
          {!readOnly && <Toolbar readonly={readOnly} />}
          <Editable
            className="p-2"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly={readOnly}
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
