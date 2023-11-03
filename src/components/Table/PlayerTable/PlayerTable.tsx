'use client'

import Table, { CellData, ColumnProps, RowData } from '../Table';
import { LeaderboardPlayerData } from '@/types/data/leaderboard';
import { transformDataToTableRow } from '@/utils/table';

import './PlayerTable.scss';
import { DROPDOWN_LABEL_BY_TABLE_TYPE, PlayerTableType, getColumnsByPlayerTableType } from './columns';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { LeaderboardResponse, Player } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript/leaderboard';
import { ActiveGame, ActiveGamesResponse } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript/active-game';

interface Props {
  rows: LeaderboardPlayerData[];
  initialResponseTimestamp: number;
}

const tableTypes: PlayerTableType[] = [PlayerTableType.RESULTS, PlayerTableType.COMBAT_TOTAL, PlayerTableType.COMBAT_PER_GAME];
const DEFAULT_TABLE_TYPE = PlayerTableType.RESULTS;

const LEADERBOARD_REFRESH_RATE_SECONDS = 300;
const LIVE_GAME_REFRESH_RATE_SECONDS = 60;

const PlayerTable: React.FC<Props> = ({ rows: initialRows, initialResponseTimestamp }) => {
  const [tableType, setTableType] = useState<PlayerTableType>(DEFAULT_TABLE_TYPE);
  const [rows, setRows] = useState<LeaderboardPlayerData[]>(initialRows);
  const [responseTimestamp, setResponseTimestamp] = useState<number>(initialResponseTimestamp);
  
  const [fetchLeaderboardTimer, setFetchLeaderboardTimer] = useState<NodeJS.Timeout>();
  const [fetchActiveGamesTimer, setFetchActiveGamesTimer] = useState<NodeJS.Timeout>();
  const data = rows.map(transformDataToTableRow);

  const columns = getColumnsByPlayerTableType(tableType);

  const handleDropdownChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log('Selected:', e.target.value);
    setTableType(e.target.value as PlayerTableType)
  }

  const refreshLiveGameData = async () => {
    const { signal } = new AbortController();

    const res = await fetch(`/api/active-game?timestamp=${Date.now()}`, {
      signal,
      cache: 'no-store',
    });

    const activeGamesResponse: ActiveGamesResponse = await res.json();

    if (!activeGamesResponse || !activeGamesResponse.activeGames) {
      console.warn('No response from /active-game');
      return;
    }

    const activeGamesMap: Record<string, ActiveGame> = activeGamesResponse.activeGames.reduce((acc, game) => {
      acc[game.summonerId] = game;
      return acc;
    }, {} as Record<string, ActiveGame>);

    const updatedRows: Player[] = rows.map(row => {
      const activeGame = activeGamesMap[row.id];

      if (!activeGame || !activeGame.isInActiveGame) return row;

      const { isInActiveGame, activeGameChampionImage } = activeGame;

      return { ...row, isInActiveGame, activeGameChampionImage };
    })

    setRows(updatedRows);
  }

  const refreshLeaderboardData = async () => {
    const { signal } = new AbortController();

    const res = await fetch(`/api/leaderboard`, {
      signal,
    });

    const leaderboard: LeaderboardResponse = await res.json();
    const { players, timestamp } = leaderboard;

    if (timestamp) {
      console.log(`Timestamp: ${Math.floor((Date.now() - timestamp)/1000)} seconds ago.`)
      if (timestamp < responseTimestamp) return;
    }


    if (players) {
      const newPlayers = players.map((player) => {
        const existingRow = rows.find(row => row.id === player.id);

        if (!existingRow) return player;

        const { isInActiveGame, activeGameChampionImage } = existingRow;

        return { ...player, isInActiveGame, activeGameChampionImage };
      })
      if (timestamp) setResponseTimestamp(timestamp);
      setRows(newPlayers);
    }
  }

  useEffect(() => {
    refreshLeaderboardData();
    refreshLiveGameData();
    if (!fetchLeaderboardTimer) {
      const timer = setInterval(() => {
        refreshLeaderboardData();
      }, LEADERBOARD_REFRESH_RATE_SECONDS * 1000);

      setFetchLeaderboardTimer(timer);
    }

    if (!fetchActiveGamesTimer) {
      const timer = setInterval(() => {
        refreshLeaderboardData();
      }, LIVE_GAME_REFRESH_RATE_SECONDS * 1000);

      setFetchActiveGamesTimer(timer);
    }

    return () => {
      if (fetchLeaderboardTimer) {
        clearInterval(fetchLeaderboardTimer);
        setFetchLeaderboardTimer(undefined);
      }
      if (fetchActiveGamesTimer) {
        clearInterval(fetchActiveGamesTimer);
        setFetchActiveGamesTimer(undefined);
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