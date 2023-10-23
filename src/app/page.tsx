'use client'

import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { LeaderboardApi } from '@bakery-leaderboard-ts-sdk'
import { useEffect, useState } from 'react';
import { Configuration, Player } from '../../resources/BakeryLeaderboardServiceModel/output/model/typescript';

export default function Home() {
  const leaderboardApi = new LeaderboardApi();

  const [leaderboardData, setLeaderboardData] = useState<Player[]>([]);

  const getLeaderboard = async () => {
    const leaderboard = await leaderboardApi.getLeaderboard();

    if (!leaderboard.players) {
      return;
    }

    setLeaderboardData(leaderboard.players);
  }

  useEffect(() => {
    getLeaderboard();
  }, [])
  return (
    <div className={styles.homepage}>
      <PlayerTable rows={leaderboardData} />
    </div>
  )
}
