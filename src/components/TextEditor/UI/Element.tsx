import { FC } from 'react';
import './Element.css';
interface Element {
  attributes: any;
  children: any;
  element: any;
}

const Element: FC<Element> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
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
    default:
      return (
        <p style={style} {...attributes} className="element-paragraph">
          {children}
        </p>
      );
  }
};
export default Element;
