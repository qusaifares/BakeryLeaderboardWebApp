'use client'

import Table, { CellData, ColumnProps, RowData } from '../Table';
import { LeaderboardPlayerData } from '@/types/data/leaderboard';
import { transformDataToTableRow } from '@/utils/table';

import './PlayerTable.scss';
import { DROPDOWN_LABEL_BY_TABLE_TYPE, PlayerTableType, getColumnsByPlayerTableType } from './columns';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { leaderboardApi } from '@/utils/leaderboardApi';
import { LeaderboardResponse } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript';

interface Props {
  rows: LeaderboardPlayerData[];
}

const tableTypes: PlayerTableType[] = [PlayerTableType.RESULTS, PlayerTableType.COMBAT_TOTAL, PlayerTableType.COMBAT_PER_GAME];
const DEFAULT_TABLE_TYPE = PlayerTableType.RESULTS;

const PlayerTable: React.FC<Props> = ({ rows: initialRows }) => {
  const [tableType, setTableType] = useState<PlayerTableType>(DEFAULT_TABLE_TYPE);
  const [rows, setRows] = useState<LeaderboardPlayerData[]>(initialRows);
  const [fetchTimer, setFetchTimer] = useState<NodeJS.Timeout>();
  const data = rows.map(transformDataToTableRow);

  const columns = getColumnsByPlayerTableType(tableType);

  const handleDropdownChange: ChangeEventHandler<HTMLSelectElement> = e => {
    console.log('Selected:', e.target.value);
    setTableType(e.target.value as PlayerTableType)
  }

  const refreshRows = async () => {
    const { signal } = new AbortController();

    const res = await fetch('/api/leaderboard', {
      signal,
      next: { revalidate: 0 },
      cache: 'no-store',
    });

    const leaderboard: LeaderboardResponse = await res.json();
    const { players, timestamp } = leaderboard;

    if (timestamp) {
      console.log(`Timestamp: ${Math.floor((Date.now() - timestamp)/1000)} seconds ago.`)
    }

    if (players) {
      setRows(players);
    }
  }

  useEffect(() => {
    refreshRows();
    if (!fetchTimer) {
      const timer = setInterval(() => {
        refreshRows();
      }, 60000);

      setFetchTimer(timer);
    }

    return () => {
      if (fetchTimer) {
        clearInterval(fetchTimer);
        setFetchTimer(undefined);
      }
    }
  }, []);

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