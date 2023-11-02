import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { serverSideLeaderboardApi } from '@/utils/leaderboardApi';

export default async function Home() {
  const leaderboard = await serverSideLeaderboardApi.getLeaderboard();

  const leaderboardData = leaderboard?.players || [];
  const dataTimestamp = leaderboard.timestamp;

  console.log('Leaderboard data:', leaderboardData);
  return (
    <div className={styles.homepage}>
      {/* {JSON.stringify(leaderboardData)} */}
      <PlayerTable rows={leaderboardData} initialResponseTimestamp={dataTimestamp} />
    </div>
  )
}
