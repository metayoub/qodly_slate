import { FC } from 'react';

interface Leaf {
  attributes: any;
  children: any;
  leaf: any;
}

const Leaf: FC<Leaf> = ({ attributes, children, leaf }) => {
  let style = {};

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  if (leaf.color) {
    style = { ...style, color: leaf.color };
  }

  if (leaf.backgroundColor) {
    style = { ...style, backgroundColor: leaf.backgroundColor };
  }

  const title = typeof children === 'string' ? children : undefined;

  return (
    <span {...attributes} title={title} style={style}>
      {children}
    </span>
  );
};

export default Leaf;
