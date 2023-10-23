import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { LeaderboardApi } from '@bakery-leaderboard-ts-sdk'
import { Configuration } from '../../resources/BakeryLeaderboardServiceModel/output/model/typescript';

export default async function Home() {
  const leaderboardApi = new LeaderboardApi(new Configuration({
    fetchApi(input, init) {
        return fetch(input, { ...init, next: { revalidate: 60 } });
    },
  }));

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
