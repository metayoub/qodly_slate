import { IconType } from 'react-icons';
import { Button } from './';
import { useSlate } from 'slate-react';
import { FC } from 'react';
import { Node, Element, Transforms } from 'slate';

interface TableButton {
  icon: IconType;
  readonly?: boolean;
}

interface Table extends Element {
  type: 'table';
  children: Node[];
}

interface Cell extends Element {
  type: 'table-cell';
  key: string;
  children: Node[];
}

interface Row extends Element {
  type: 'table-row';
  key: string;
  children: Cell[];
}

const createCell = (): Cell => {
  return {
    type: 'table-cell',
    key: `cell_${Math.random().toString(36).substring(2, 15)}`,
    children: [{ type: 'paragraph', children: [{ text: '' }] }] as any,
  };
};

const createRow = (columns: number): Row => {
  const cells = Array.from({ length: columns }, () => createCell());
  return {
    type: 'table-row',
    key: `row_${Math.random().toString(36).substring(2, 15)}`,
    children: cells,
  };
};

const createTable = (columns: number, rows: number): Table => {
  const tableRows = Array.from({ length: rows }, () => createRow(columns));
  return {
    type: 'table',
    children: tableRows,
  };
};

//button def
const TableButton: FC<TableButton> = ({ icon: Icon, readonly }) => {
  const editor = useSlate();

  const insertTable = () => {
    const table = createTable(3, 3);
    Transforms.insertNodes(editor, table);
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        !readonly && insertTable();
      }}
    >
      <Icon />
    </Button>
  );
};

export default TableButton;
