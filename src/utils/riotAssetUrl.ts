import { PlayerTierEnum } from "../../resources/BakeryLeaderboardServiceModel/output/model/typescript/leaderboard";

export const getEmblemImageUrlByTier = (tier: PlayerTierEnum) => {
  if (!tier) return;
  if (tier === 'EMERALD') tier = 'PLATINUM';

  return `/images/ranked-emblem/emblem-${(tier).toLowerCase()}.png`;
}