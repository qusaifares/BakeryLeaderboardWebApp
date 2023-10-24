'use client'

import Table, { CellData, ColumnProps, RowData } from '../Table';
import { LeaderboardPlayerData } from '@/types/data/leaderboard';
import { transformDataToTableRow } from '@/utils/table';

import './PlayerTable.scss'
import { PlayerTierEnum } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript';
import TierImage from '@/components/Image/TierImage/TierImage';
import Avatar from '@/components/Image/Avatar/Avatar';

interface Props {
  rows: LeaderboardPlayerData[];
}

const columns: ColumnProps<RowData<LeaderboardPlayerData>>[] = [
  { label: 'Place', key: 'place' },
  { label: 'Player', key: 'name', displayFunction: (r) => {
    const avatarUrl = r.discordAvatarUrl?.value;
    const summonerName = r.name.value;
    return <div className='playerTable__playerCell'>
    {avatarUrl ? <Avatar src={avatarUrl} /> : null}
    <a href={`https://www.op.gg/summoners/na/${encodeURIComponent(summonerName)}`} target='_blank' rel='noopener noreferrer'>{r.name.value}</a>
    </div>
  } },
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
    displayFunction: (r) => `${(100*(r.winRate.value as number || 0)).toFixed(2)}%`
  },
  {
    label: 'KDA',
    key: 'kills',
    displayFunction(r) {
      const kills = r.kills?.value || 0;
      const deaths = r.deaths?.value || 1;
      const assists = r.assists?.value || 0;
      const kda = (kills + assists)/deaths;
      return `${kda.toFixed(1)}`
    },
    sortKey(r) {
      const kills = r.kills?.value || 0;
      const deaths = r.deaths?.value || 1;
      const assists = r.assists?.value || 0;
      const kda = (kills + assists)/deaths;
      
      return kda;
    },
  },
  { label: 'Rank', key: 'rank',
  displayFunction: (r) => {
    const v = r.rank.value;
    const tier = r.tier.value as PlayerTierEnum;
    return <div className='playerTable__tierCell'>
        {tier && <TierImage tier={tier} width={128} height={72} />}
        <p style={{marginLeft: '0.25rem'}}>{v}</p>
      </div>
    },
    sortKey: (r) => r.rankValue.value
  },
  // { label: 'Tier', key: 'tier', displayFunction: (r) => {
  // const v = r.tier.value;
  // return <div className='playerTable__tierCell'>
  //   {v && <TierImage tier={v as PlayerTierEnum} width={128} height={72} />}
  //   <p style={{marginLeft: '0.25rem'}}>{capitalized((v || '').toLowerCase())}</p>
  // </div>
  // }},
  // { label: 'Division', key: 'division' },
  // { label: 'LP', key: 'leaguePoints' },
  { label: 'Current Streak', key: 'currentStreak' },
];



const PlayerTable: React.FC<Props> = ({ rows }) => {
  const data = rows.map(transformDataToTableRow);

  return <Table columns={columns} data={data} rowKey={(r) => r.id.value} />;
};

export default PlayerTable;