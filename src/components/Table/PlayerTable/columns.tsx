import { LeaderboardPlayerData } from "@/types/data/leaderboard";
import { ColumnProps, RowData } from "../Table";
import Avatar from "@/components/Image/Avatar/Avatar";
import { PlayerTierEnum } from "../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript";
import TierImage from "@/components/Image/TierImage/TierImage";
import Tooltip from "@/components/Tooltip/Tooltip";

export enum PlayerTableType {
  RESULTS = 'RESULTS',
  COMBAT_TOTAL = 'COMBAT_TOTAL',
  COMBAT_PER_GAME = 'COMBAT_PER_GAME',
}

export function getColumnsByPlayerTableType(tableType: PlayerTableType) {
  return getColumns(ADDITIONAL_COLUMNS_BY_TABLE_TYPE[tableType]);
}

const getColumns = (additionalColumns: ColumnProps<RowData<LeaderboardPlayerData>>[] = []): ColumnProps<RowData<LeaderboardPlayerData>>[] => [
  {
    label: 'Place',
    key: 'place'
  },
  {
    label: 'Player',
    key: 'name',
    displayFunction: (r) => {
      const avatarUrl = r.discordAvatarUrl?.value;
      const summonerName = r.name.value;
      return <div className='playerTable__playerCell'>
      {avatarUrl ? <Avatar src={avatarUrl} /> : null}
      <a href={`https://www.op.gg/summoners/na/${encodeURIComponent(summonerName)}`} target='_blank' rel='noopener noreferrer'>{r.name.value}</a>
      </div>
    }
  },
  {
    label: 'Rank', key: 'rank',
    displayFunction: (row) => {
      const v = row.rank.value;
      const tier = row.tier.value as PlayerTierEnum;
      return <div className='playerTable__tierCell' style={{position: 'relative'}}>
        <Tooltip label={row.rankLastUpdated.value} />
          {tier && <TierImage tier={tier} width={128} height={72} />}
          <p style={{ marginLeft: '0.25rem' }}>{v}</p>
        </div>
    },
    sortKey: (row) => row.rankValue.value
  },
  ...additionalColumns,
];


export const combatColumns: ColumnProps<RowData<LeaderboardPlayerData>>[] = [
  {
    label: 'Kills',
    key: 'kills',
  },
  {
    label: 'Deaths',
    key: 'deaths',
  },
  {
    label: 'Assists',
    key: 'assists',
  },
  {
    label: 'KDA',
    key: 'kda',
    displayFunction(row) {
      const kills = row.kills?.value || 0;
      const deaths = row.deaths?.value || 1;
      const assists = row.assists?.value || 0;
      const kda = row.kda?.value ?? (kills + assists)/deaths;
      return `${kda.toFixed(1)}`
    },
    sortKey(row) {
      const kills = row.kills?.value || 0;
      const deaths = row.deaths?.value || 1;
      const assists = row.assists?.value || 0;

      const kda = row.kda?.value ?? (kills + assists)/deaths;

      return kda;
    },
  },
  {
    label: 'Games Played',
    key: 'gamesPlayed',
  },
];


export const combatPerGameColumns: ColumnProps<RowData<LeaderboardPlayerData>>[] = [
  {
    label: 'Kills',
    key: 'killsPerGame',
    displayFunction(row) {
        return row.killsPerGame.value.toFixed(1);
    },
  },
  {
    label: 'Deaths',
    key: 'deathsPerGame',
    displayFunction(row) {
        return row.deathsPerGame.value.toFixed(1);
    },
  },
  {
    label: 'Assists',
    key: 'assistsPerGame',
    displayFunction(row) {
        return row.assistsPerGame.value.toFixed(1);
    },
  },
  {
    label: 'KDA',
    key: 'kda',
    displayFunction(row) {
      const kills = row.kills?.value || 0;
      const deaths = row.deaths?.value || 1;
      const assists = row.assists?.value || 0;
      const kda = row.kda?.value ?? (kills + assists)/deaths;
      return `${kda.toFixed(1)}`
    },
    sortKey(row) {
      const kills = row.kills?.value || 0;
      const deaths = row.deaths?.value || 1;
      const assists = row.assists?.value || 0;

      const kda = row.kda?.value ?? (kills + assists)/deaths;

      return kda;
    },
  },
  {
    label: 'Games Played',
    key: 'gamesPlayed',
  },
];


export const defaultColumns: ColumnProps<RowData<LeaderboardPlayerData>>[] = [
  {
    label: 'Wins',
    key: 'wins',
  },
  {
    label: 'Losses',
    key: 'losses',
  },
  {
    label: 'Win Rate',
    key: 'winRate',
    displayFunction(r) {
      const winRate = r.winRate.value;
      return <span className={`playerTable__winRate-${winRate > 0.5 ? 'positive' : winRate === 0.5 ? 'neutral' : 'negative'}`}>{(100*(r.winRate.value as number || 0)).toFixed(2)}%</span>
    }
  },
  {
    label: 'Current Streak',
    key: 'currentStreak',
    displayFunction(row) {
      const streak = row.currentStreak.value;
      const streakString = streak > 0 ? `+${streak}` : `${streak}`;
      return <span className={`playerTable__streak-${streak > 0 ? 'positive' : streak === 0 ? 'neutral' : 'negative'}`}>{streakString}</span>
    }
  },
  {
    label: 'Live Game',
    key: 'isInActiveGame',
    displayFunction(row) {
      const isInActiveGame = row.isInActiveGame.value;
      const inGameLink = `https://www.op.gg/summoners/na/${encodeURIComponent(row.name.value)}/ingame`;
      if (isInActiveGame) fetch(inGameLink);
      const src = row.activeGameChampionImage?.value || null;
        return src && <div style={{marginLeft: 16}}><a href={inGameLink} target='_blank' rel='noopener noreferrer'><Avatar src={src} /></a></div>;
    },
  },
];

const ADDITIONAL_COLUMNS_BY_TABLE_TYPE = {
  [PlayerTableType.RESULTS]: defaultColumns,
  [PlayerTableType.COMBAT_TOTAL]: combatColumns,
  [PlayerTableType.COMBAT_PER_GAME]: combatPerGameColumns,
} as const satisfies Record<PlayerTableType, ColumnProps<RowData<LeaderboardPlayerData>>[]>;

export const DROPDOWN_LABEL_BY_TABLE_TYPE = {
  [PlayerTableType.RESULTS]: "Game Results",
  [PlayerTableType.COMBAT_TOTAL]: "Combat Stats (Total)",
  [PlayerTableType.COMBAT_PER_GAME]: "Combat Stats (Per Game)",
} as const satisfies Record<PlayerTableType, string>;