'use client'

import React, { FC, Key, MouseEvent, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import TableRow, { TableRowProps } from './TableRow';
import './Table.scss'

type ColumnKey<R extends RowData> = keyof R extends string ? keyof R : never;

export type RowData<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: CellData<T[K]>;
}

export interface ColumnProps<T extends RowData, K extends ColumnKey<T> = ColumnKey<T>> {
  label: string;
  key: K;
  displayFunction?: (value: RowData[K]['value']) => ReactNode;
  sortKey?: (value: T) => string | number;
}

export interface CellData<T = any> {
  value: T;
}

export interface TableProps<R extends RowData> {
  columns: ColumnProps<R>[];
  data: R[];
  rowKey: (row: R) => Key;
}

enum SortType {
  ASCENDING,
  DESCENDING,
}

interface SortState {
  key: string;
  type: SortType;
}

const arrowBySortType: Record<SortType, ReactNode> = {
  [SortType.ASCENDING]: <> ▲</>,
  [SortType.DESCENDING]: <> ▼</>,
}


const Table = <R extends RowData>({ columns, data, rowKey }: TableProps<R>): ReactNode  => {
  const [rows, setRows] = useState(data.map((rowData) => buildRowProps(rowData, columns, rowKey)));
  
  const [sortState, setSortState] = useState<SortState>({ key: 'place', type: SortType.ASCENDING });

  const getCurrentSortColumn = (): ColumnProps<R> | undefined => {
    return columns.find(c => c.key === sortState.key);
  }

  const updateSortKey = (key: string) => {
    setSortState({
      type: SortType.ASCENDING,
      key,
    })
  };

  const updateSortType = () => {
    setSortState(prevState => ({
      ...prevState,
      type: prevState.type === SortType.ASCENDING ? SortType.DESCENDING : SortType.ASCENDING,
    }));
  }

  const handleColumnLabelClick = (key: string) => (_: MouseEvent<HTMLTableCellElement>) => {
    if (key === sortState.key) {
      updateSortType();
    } else {
      updateSortKey(key);
    }
  }

  useEffect(() => {
    console.log(sortState);

    const sortedRows = [...data].sort((a, b) => {
      const currentColumn = getCurrentSortColumn();

      const getSortKey = currentColumn?.sortKey || ((v) => v[sortState.key]?.value);

      const val1 = getSortKey(a);
      const val2 = getSortKey(b);
      
      console.log(val1)

      if (typeof val1 === 'string' && typeof val2 === 'string') {
        return sortState.type === SortType.ASCENDING ? val1.localeCompare(val2) : val2.localeCompare(val1);
      } else if (typeof val1 === 'number' && typeof val2 === 'number') {
        return sortState.type === SortType.ASCENDING ?  val1 - val2 : val2 - val1;
      }
      return 0;
    }).map((rowData) => buildRowProps(rowData, columns, rowKey));

    console.log(sortedRows)

    setRows(sortedRows)
  }, [sortState, data, columns, rowKey]);

  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map(({ label, key }, i) => (
            <th className={`table__columnLabel ${sortState.key === key ? 'table__columnLabelSortKey' : ''}`} onClick={handleColumnLabelClick(key)} key={i}>
              {label}
              <span>{arrowBySortType[sortState.type]}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({key, ...rowProps}) => (
          <TableRow key={key} {...rowProps} />
        ))}
      </tbody>
    </table>
  );
};

function buildRowProps<R extends RowData>(data: TableProps<R>['data'][0], columns: ColumnProps<R>[], rowKey: (r: R) => Key): TableRowProps {
  return {
    key: rowKey(data),
    cells: columns.map(({ key, displayFunction }) => {
      const cell = data[key];
      const cellContent = displayFunction ? displayFunction(data) : cell.value;
      return {
        content: cellContent,
      }
    })
  }
}

export default Table