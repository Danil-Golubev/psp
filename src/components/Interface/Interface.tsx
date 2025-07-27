import { useEffect, useState } from 'react';
import { pspOptions } from '../../options';
import { SemiOption } from '../../types';
import './styles.css';

export const Interface = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSemi, setSelectedSemi] = useState<SemiOption | null>(null);
  const OPTION_WIDTH = 120;
  const CONTAINER_WIDTH = 360;

  const offset = CONTAINER_WIDTH / 2 - OPTION_WIDTH / 2;
  const transformX = -selectedIndex * OPTION_WIDTH + offset;

  const selectedMain = pspOptions[selectedIndex];

  useEffect(() => {
    setSelectedSemi(null);
  }, [selectedIndex]);

  return (
    <div className="interface-wrapper">
      <div className="menu-wrapper">
        <div
          className="menu-track"
          style={{
            transform: `translateX(calc(${-(selectedIndex - 1) * (100 / 6)}%))`
          }}>
          {pspOptions.map((opt, idx) => (
            <div
              key={opt.name}
              className={`main-option ${idx === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(idx)}>
              <img src={opt.icon} alt={opt.name} />
              <span>{opt.name}</span>
            </div>
          ))}
        </div>
      </div>
      {selectedMain && (
        <div className="semi-options-list">
          {selectedMain.semiOptions.map((semi) => (
            <button
              key={semi.name}
              className={`semi-btn ${selectedSemi?.name === semi.name ? 'active' : ''}`}
              onClick={() => setSelectedSemi(semi)}>
              <img src={semi.icon} alt={semi.name} />
              <span>{semi.name}</span>
            </button>
          ))}
        </div>
      )}
      {selectedSemi && <div className="content-panel">{selectedSemi.data}</div>}
    </div>
  );
};
