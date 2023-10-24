import styles from './page.module.scss'
import PlayerTable from '@/components/Table/PlayerTable/PlayerTable'
import { LeaderboardApi } from '@bakery-leaderboard-ts-sdk'
import { Configuration } from '../../resources/BakeryLeaderboardServiceModel/output/model/typescript';

export default async function Home() {
  const leaderboardApi = new LeaderboardApi(new Configuration({
    fetchApi(input, init) {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // e.g. "America/New_York"
        return fetch(input, {
          ...init,
          headers: { ...init?.headers, 'X-User-Timezone': timeZone },
          next: { revalidate: 60 },
          cache: 'default'
        });
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
