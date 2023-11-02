import { ActiveGameApi, Configuration } from "../../resources/BakeryLeaderboardServiceModel/output/model/typescript/active-game";

export const activeGameApi = new ActiveGameApi(new Configuration({
  fetchApi(input, init) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions(); // e.g. "America/New_York"
      return fetch(input, {
        ...init,
        // headers: { ...init?.headers, 'X-User-Timezone': timeZone },
        cache: 'no-store',
      });
  },
}));