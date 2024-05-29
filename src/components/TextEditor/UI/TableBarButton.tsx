import { IconType } from 'react-icons';
import { FC, useState } from 'react';
import { Button } from './';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import useTable from '../Hooks/useTable';

interface TableBarButton {
  icon: IconType;
  readonly?: boolean;
  format: string;
}
const TableBarButton: FC<TableBarButton> = ({ icon: Icon, readonly, format }) => {
  const [isHovered, setHover] = useState<boolean>(false);

  const editor = useSlate();
  const [table] = Array.from(
    //get the table element
    Editor.nodes(editor, {
      match: (n) => (n as any).type === 'table',
    }),
  );

  const handleToolBar = (format: string) => {
    //table toolbar actions
    const { insertRow, insertCell, deleteRow, deleteCell, deleteTable } = useTable();

    switch (format) {
      case 'insertRowLeft':
        insertCell(editor, 'left', table);
        return;
      case 'insertRowRight':
        insertCell(editor, 'right', table);
        return;
      case 'insertRowAbove':
        insertRow(editor, 'above', table);
        return;
      case 'insertRowBelow':
        insertRow(editor, 'below', table);
        return;
      case 'deleteRow':
        deleteRow(editor);
        return;
      case 'deleteColumn':
        deleteCell(editor);
        return;
      case 'deleteTable':
        deleteTable(editor, table);
        return;
    }
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        !readonly && handleToolBar(format);
      }}
      className={isHovered && 'text-gray-700'}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Icon />
    </Button>
  );
};

export default TableBarButton;
