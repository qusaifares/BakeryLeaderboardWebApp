import { Configuration, LeaderboardApi } from "../../resources/BakeryLeaderboardServiceModel/output/model/typescript";

export const leaderboardApi = new LeaderboardApi(new Configuration({
  fetchApi(input, init) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // e.g. "America/New_York"
      return fetch(input, {
        ...init,
        // headers: { ...init?.headers, 'X-User-Timezone': timeZone },
        // next: { revalidate: 60 },
        cache: 'no-cache',
      });
  },
}));