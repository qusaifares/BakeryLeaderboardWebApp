'use client'

import Table, { CellData, ColumnProps, RowData } from '../Table';
import { LeaderboardPlayerData } from '@/types/data/leaderboard';
import { transformDataToTableRow } from '@/utils/table';

import './PlayerTable.scss';
import { DROPDOWN_LABEL_BY_TABLE_TYPE, PlayerTableType, getColumnsByPlayerTableType } from './columns';
import { ChangeEventHandler, useState } from 'react';

interface Props {
  rows: LeaderboardPlayerData[];
}

const tableTypes: PlayerTableType[] = [PlayerTableType.RESULTS, PlayerTableType.COMBAT_TOTAL, PlayerTableType.COMBAT_PER_GAME];
const DEFAULT_TABLE_TYPE = PlayerTableType.RESULTS;

const PlayerTable: React.FC<Props> = ({ rows }) => {
  const [tableType, setTableType] = useState<PlayerTableType>(DEFAULT_TABLE_TYPE);
  const data = rows.map(transformDataToTableRow);

  const columns = getColumnsByPlayerTableType(tableType);

  const handleDropdownChange: ChangeEventHandler<HTMLSelectElement> = e => {
    console.log('Selected:', e.target.value);
    setTableType(e.target.value as PlayerTableType)
  }

  return <div className='playerTable'>
    <div className="playerTable__dropdownContainer">
      <select onChange={handleDropdownChange} name="playerTable__dropdown" id="playerTable__dropdown" className="playerTable__dropdown" defaultValue={tableType}>
        {tableTypes.map(t => <option value={t} key={t}>{DROPDOWN_LABEL_BY_TABLE_TYPE[t as PlayerTableType]}</option>)}
      </select>
    </div>
      <Table columns={columns} data={data} rowKey={(r) => r.id.value} />
    </div>;
};

export default PlayerTable;