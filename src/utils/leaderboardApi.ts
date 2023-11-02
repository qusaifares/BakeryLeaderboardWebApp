import { Configuration, LeaderboardApi } from "../../resources/BakeryLeaderboardServiceModel/output/model/typescript/leaderboard";

export const serverSideLeaderboardApi = new LeaderboardApi(new Configuration({
  fetchApi(input, init) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // e.g. "America/New_York"
      return fetch(input, {
        ...init,
        // headers: { ...init?.headers, 'X-User-Timezone': timeZone },
      });
  },
}));
export const clientSideLeaderboardApi = new LeaderboardApi(new Configuration({
  fetchApi(input, init) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // e.g. "America/New_York"
      return fetch(input, {
        ...init,
        // headers: { ...init?.headers, 'X-User-Timezone': timeZone },
        cache: 'no-store',
      });
  },
}));
