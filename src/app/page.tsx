import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { LeaderboardApi } from '@bakery-leaderboard-ts-sdk'

import { Configuration, Player } from '../../resources/BakeryLeaderboardServiceModel/output/model/typescript';

export default async function Home() {
  const leaderboardApi = new LeaderboardApi();

  const leaderboard = await leaderboardApi.getLeaderboard();

  const leaderboardData = leaderboard?.players || [];
  return (
    <div className={styles.homepage}>
      <PlayerTable rows={leaderboardData} />
    </div>
  )
}
