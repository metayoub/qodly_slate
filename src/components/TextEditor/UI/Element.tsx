import { FC } from 'react';
import './Element.css';
import { MdDelete } from 'react-icons/md';
import { Button } from '.';
import { useFocused, useSelected, useSlate } from 'slate-react';
import useImage from '../Hooks/useImage';

interface Element {
  attributes: any;
  children: any;
  element: any;
}

const Element: FC<Element> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'image':
      const selected = useSelected();
      const focused = useFocused();
      const editor = useSlate();
      const { unwrapImage } = useImage();
      return (
        <div {...attributes}>
          <div contentEditable={false} style={{ position: 'relative', width: 'fit-content' }}>
            <img
              src={element.url}
              style={{
                display: 'block',
                maxHeight: '20em',
                maxWidth: '100%',
                boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
              }}
            />
            <Button
              active
              onClick={() => unwrapImage(editor)}
              style={{
                position: 'absolute',
                top: '0.5em',
                right: '0.5em',
                BackgroundColor: 'white',
                display: selected && focused ? 'inline' : 'none',
              }}
            >
              <MdDelete />
            </Button>
          </div>
          {children}
        </div>
      );
    case 'link':
      return (
        <a
          style={{ ...style, cursor: 'pointer', textDecoration: 'underline' }}
          {...attributes}
          href={element.url}
          target="_blank"
        >
          {children}
        </a>
      );
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'video':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <iframe src={element.url} allowFullScreen title="Embedded video" />
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p style={style} {...attributes} className="element-paragraph">
          {children}
        </p>
      );
  }
};
export default Element;
