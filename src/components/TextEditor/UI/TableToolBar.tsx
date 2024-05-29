import { FC, useRef } from 'react';
import {
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowRight,
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
  AiOutlineDelete,
  AiOutlineDeleteRow,
  AiOutlineDeleteColumn,
} from 'react-icons/ai';
import TableBarButton from './TableBarButton';
interface TableToolBar {
  readonly?: boolean;
}

const TableToolBar: FC<TableToolBar> = ({ readonly }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dialogRef}
      className="absolute -top-8 bg-white border border-gray-300 z-50 shadow flex p-1 gap-2"
      style={{ top: '-45px' }}
    >
      <TableBarButton readonly={readonly} icon={AiOutlineInsertRowLeft} format="insertRowLeft" />
      <TableBarButton readonly={readonly} icon={AiOutlineInsertRowRight} format="insertRowRight" />
      <TableBarButton readonly={readonly} icon={AiOutlineInsertRowAbove} format="insertRowAbove" />
      <TableBarButton readonly={readonly} icon={AiOutlineInsertRowBelow} format="insertRowBelow" />
      <TableBarButton readonly={readonly} icon={AiOutlineDeleteRow} format="deleteColumn" />
      <TableBarButton readonly={readonly} icon={AiOutlineDeleteColumn} format="deleteRow" />
      <TableBarButton readonly={readonly} icon={AiOutlineDelete} format="deleteTable" />
    </div>
  );
};

export default TableToolBar;
