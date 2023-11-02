import { PlayerDivisionEnum, PlayerTierEnum } from "../../resources/BakeryLeaderboardServiceModel/output/model/typescript/leaderboard";
import { capitalized } from "./string";

export function extractTierFromRankString(rankString: string): PlayerTierEnum | null {
  const tierString = rankString.split(' ')[0];
  if (!tierString) return null;
  
  const tier = PlayerTierEnum[capitalized(tierString.toLowerCase()) as keyof typeof PlayerTierEnum];

  return tier || null;
}

export function getRankValue(tier: PlayerTierEnum, division: PlayerDivisionEnum, leaguePoints: number) {
  if (!tier || !division) return 0;

  const VALUE_BY_TIER = {
    [PlayerTierEnum.Challenger]: 4500,
    [PlayerTierEnum.Grandmaster]: 4000,
    [PlayerTierEnum.Master]: 3500,
    [PlayerTierEnum.Diamond]: 3000,
    [PlayerTierEnum.Emerald]: 2500,
    [PlayerTierEnum.Platinum]: 2000,
    [PlayerTierEnum.Gold]: 1500,
    [PlayerTierEnum.Silver]: 1000,
    [PlayerTierEnum.Bronze]: 500,
    [PlayerTierEnum.Iron]: 0,
    '': 0
  } as const satisfies Record<PlayerTierEnum, number>;

  const VALUE_BY_DIVISION = {
    [PlayerDivisionEnum.I]: 300,
    [PlayerDivisionEnum.Ii]: 200,
    [PlayerDivisionEnum.Iii]: 100,
    [PlayerDivisionEnum.Iv]: 0,
    '': 0,
  } as const satisfies Record<PlayerDivisionEnum, number>;

  return VALUE_BY_TIER[tier] + VALUE_BY_DIVISION[division] + (leaguePoints || 0);
}