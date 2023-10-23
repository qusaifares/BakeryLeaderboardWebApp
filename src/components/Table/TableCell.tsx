import React, { FC } from 'react';

export interface TableCellProps {
  content: string;
}

const TableCell: FC<TableCellProps> = ({ content }) => {
  return (
      <td>{content}</td>
  )
}

export default TableCell;