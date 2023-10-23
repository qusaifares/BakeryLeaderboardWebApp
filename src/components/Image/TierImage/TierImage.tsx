import React from 'react';
import './TierImage.scss';
import { PlayerTierEnum } from '../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript';
import { getEmblemImageUrlByTier } from '@/utils/riotAssetUrl';
import Image from 'next/image';

interface Props {
  tier: PlayerTierEnum;
  height?: number;
  width?: number;
}

const TierImage: React.FC<Props> = ({ tier, height = 144, width = 256 }) => {
  const percentOfWidthAsMargin = 90/256;
  const percentOfHeightAsMargin = 45/144;

  const margin = `-${height * percentOfHeightAsMargin}px -${width * percentOfWidthAsMargin}px`;

  const url = getEmblemImageUrlByTier(tier);

  return (
    <div className="tierImage">
      {url ? <Image src={url} alt='Rank emblem' width={width} height={height} style={{ margin }} /> : null}
    </div>
  )
};

export default TierImage;