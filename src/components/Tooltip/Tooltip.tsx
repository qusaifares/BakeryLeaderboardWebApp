import React from 'react';
import './Tooltip.scss';

interface Props {
  label: string;
}

const Tooltip: React.FC<Props> = ({ label }) => {
  return (
    <div className="tooltip">
      <div className="tooltip__hoverableArea">
        <div className="tooltip__label">
          <p>{label}</p>
          </div>
      </div>
    </div>
  )
};

export default Tooltip;