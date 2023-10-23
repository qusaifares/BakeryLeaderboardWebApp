import { FC, Key } from "react";
import TableCell, { TableCellProps } from "./TableCell";

export interface TableRowProps {
  cells: TableCellProps[];
  key: Key;
}

const TableRow: FC<TableRowProps> = ({ cells }) => {
  return (
    <tr>
      {cells.map((cell, i) => <TableCell key={i} {...cell} />)}
    </tr>
  )
}

export default TableRow;