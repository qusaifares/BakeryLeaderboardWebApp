import Image from 'next/image';
import './Avatar.scss';

interface Props {
  src: string;
  diameter?: number;
}

const Avatar: React.FC<Props> = ({ src, diameter = 30 }) => {
  const width = diameter;
  const height = diameter;
  return (
    <div className="avatar" style={{ width, height}}>
      <Image src={src} alt='Discord avatar' width={width} height={height} />
    </div>
  )
};

export default Avatar;