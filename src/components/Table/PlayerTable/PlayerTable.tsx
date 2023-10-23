'use client'

import Table, { CellData, ColumnProps, RowData } from '../Table';
import { LeaderboardPlayerData } from '@/types/data/leaderboard';
import { transformDataToTableRow } from '@/utils/table';

import './PlayerTable.scss'
import { PlayerTierEnum } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript';
import TierImage from '@/components/Image/TierImage/TierImage';

interface Props {
  rows: LeaderboardPlayerData[];
}

const columns: ColumnProps<RowData<LeaderboardPlayerData>>[] = [
  { label: 'Place', key: 'place' },
  { label: 'Name', key: 'name' },
  { label: 'Wins', key: 'wins' },
  { label: 'Losses', key: 'losses' },
  { label: 'Win Rate', key: 'winRate', displayFunction: (r) => `${(100*(r.winRate.value as number || 0)).toFixed(2)}%` },
  { label: 'Rank', key: 'rank',
  displayFunction: (r) => {
    const v = r.rank.value;
    const tier = r.tier.value as PlayerTierEnum;
    console.log(tier, r)
    return <div className='playerTable__tierCell'>
        {tier && <TierImage tier={tier} width={128} height={72} />}
        <p style={{marginLeft: '0.25rem'}}>{v}</p>
      </div>
    },
    sortKey: (v) => v.rankValue.value
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