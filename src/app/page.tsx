import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { leaderboardApi } from '@/utils/leaderboardApi';

export default async function Home() {
  const leaderboard = await leaderboardApi.getLeaderboard();

  const leaderboardData = leaderboard?.players || [];

  console.log('Leaderboard data:', leaderboardData);
  return (
    <div className={styles.homepage}>
      {/* {JSON.stringify(leaderboardData)} */}
      <PlayerTable rows={leaderboardData} />
    </div>
  )
}
