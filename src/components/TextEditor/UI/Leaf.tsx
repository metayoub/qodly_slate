import { FC } from 'react';

interface Leaf {
  attributes: any;
  children: any;
  leaf: any;
}

const Leaf: FC<Leaf> = ({ attributes, children, leaf }) => {
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

  const color = leaf.color ? `${leaf.color}` : 'inherit';
  const title = typeof children === 'string' ? children : undefined;
  return (
    <span
      {...attributes}
      title={title}
      style={leaf.text === '' ? { color, paddingLeft: '0.1px' } : { color }}
    >
      {children}
    </span>
  );
};

export default Leaf;
