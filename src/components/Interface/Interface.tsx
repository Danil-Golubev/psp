import { useEffect, useState } from 'react';
import { defaultItems } from '../../options';
import { SemiOption } from '../../types';
import './styles.css';

export const Interface = () => {
  const [offsetX, setOffsetX] = useState<number>(0);
  const [items] = useState([...defaultItems]);
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [selectedSemiItem, setSelectedSemiItem] = useState<number>(0);
  const [outMassive, setOutMassive] = useState<SemiOption[]>([]);
  const [animating, setAnimating] = useState(false);
  const [optionSize, setOptionSize] = useState<[number, number]>([5, 10]);

  useEffect(() => {
    const getCSSVar = (varName: string) => {
      return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(varName)) || 0;
    };

    const height = getCSSVar('--item-height');
    const width = getCSSVar('--item-width');

    if (height > 0 && width > 0) {
      setOptionSize([height, width]);
    }
  }, []);

  const handleHorizontal = (dir: 'l' | 'r') => {
    if (dir === 'l' && selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
      setSelectedSemiItem(0);
      setOutMassive([]);
      setOffsetX(offsetX + optionSize[1]);
    }
    if (dir === 'r' && selectedItem < items.length - 1) {
      setSelectedItem(selectedItem + 1);
      setSelectedSemiItem(0);
      setOutMassive([]);
      setOffsetX(offsetX - optionSize[1]);
    }
  };

  const handleVertical = (dir: 'u' | 'd') => {
    if (animating) return;

    if (dir === 'u' && selectedSemiItem < items[selectedItem].semiOptions.length - 1) {
      const current = items[selectedItem].semiOptions[selectedSemiItem];
      const el = document.getElementById(`semi-${selectedSemiItem}`);
      if (el) {
        setAnimating(true);
        el.classList.add('item-leave-up');

        setTimeout(() => {
          setSelectedSemiItem((prev) => prev + 1);
          setOutMassive((prev) => [current, ...prev]);
          el.classList.remove('item-leave-up');
          setAnimating(false);
        }, 90);
      } else {
        setSelectedSemiItem((prev) => prev + 1);
        setOutMassive((prev) => [current, ...prev]);
      }
    }

    // вниз
    if (dir === 'd' && selectedSemiItem > 0) {
      const lastOut = document.querySelector('.outitem') as HTMLElement;
      if (lastOut) {
        setAnimating(true);
        lastOut.classList.add('item-leave-down');

        setTimeout(() => {
          setSelectedSemiItem((prev) => prev - 1);
          setOutMassive((prev) => prev.slice(0, -1));
          lastOut.classList.remove('item-leave-down');
          setAnimating(false);
        }, 90);
      } else {
        setSelectedSemiItem((prev) => prev - 1);
        setOutMassive((prev) => prev.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handleHorizontal('l');
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleHorizontal('r');
          break;
        case 'ArrowUp':
          event.preventDefault();
          handleVertical('u');
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleVertical('d');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, selectedSemiItem, animating, offsetX, items, outMassive]);

  return (
    <div className="wallpaper-container">
      <div className="app">
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(${offsetX}vw)`,
            transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.22, 1)'
          }}>
          {items.map((value, _index) => (
          <div className="vert-wrapper" key={_index}>
            <div className="outwrapper">
              {outMassive.map((outvalue, _outindex) => (
                <div
                  key={_outindex}
                  style={{
                    marginTop:
                      _outindex === 0
                        ? 'calc(var(--item-height) * -1)'
                        : 'calc(var(--item-height) * -2)',
                    // backgroundColor: _outindex === outMassive.length - 1 ? 'blue' : 'green',
                    width: '100%',
                    height: 'var(--item-height)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'green',
                    boxSizing: 'border-box'
                  }}
                  className={_index === selectedItem ? 'outitem out-appear' : 'display'}>
                  <img
                    src={outvalue.icon}
                    alt={outvalue.icon}
                  />
                </div>
              ))}
            </div>
            <div
              className={_index === selectedItem ? 'item-main selected' : 'item-main'}
              // style={{ backgroundColor: 'yellow' }}
            >
              <div
                style={{
                  width: _index === selectedItem ? '110%' : '100%'
                  // backgroundColor: 'yellow'
                }}>
                <img
                  alt={value.icon}
                  src={value.icon}
                  style={{
                    opacity: _index === selectedItem ? 1 : 0.7,
                    filter:
                      _index === selectedItem
                        ? 'none drop-shadow(0 0 6px rgba(255,255,255,.35))'
                        : 'blur(0.8px) grayscale(1) contrast(.85) brightness(.9)',
                    transform: _index === selectedItem ? 'scale(1.2)' : 'scale(1)',
                    transition: 'filter 0.24s cubic-bezier(0.2, 0.9, 0.22, 1), opacity 0.24s cubic-bezier(0.2, 0.9, 0.22, 1), transform 0.3s cubic-bezier(0.2, 0.9, 0.22, 1)'
                  }}
                />
                <p
                  style={{
                    opacity: _index === selectedItem ? '1' : '0'
                    // backgroundColor: 'yellow'
                  }}>
                  {value.name}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-size)', marginTop: 'var(--gap-size)' }}>
              {_index === selectedItem &&
                value.semiOptions.map((semivalue: SemiOption, _semiindex: number) => (
                  <div
                    id={`semi-${_semiindex}`}
                    className="semi-option"
                    style={{
                      display: _semiindex < outMassive.length ? 'none' : 'flex'
                      // backgroundColor: 'green'
                    }}>
                    <img
                      alt={semivalue.icon}
                      src={semivalue.icon}
                      style={{
                        opacity: _index === selectedItem ? 1 : 0.7,
                        borderRightColor: 'yellow'
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};
