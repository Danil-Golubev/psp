import { useEffect, useState, useRef } from 'react';
import { defaultItems } from '../../options';
import { SemiOption } from '../../types';
import { useSound } from '../../hooks/useSound';
import './styles.css';

export const Interface = () => {
  const [offsetX, setOffsetX] = useState<number>(0);
  const [items] = useState([...defaultItems]);
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [selectedSemiItem, setSelectedSemiItem] = useState<number>(0);
  const [visuallySelectedItem, setVisuallySelectedItem] = useState<number>(1);
  const [outMassive, setOutMassive] = useState<SemiOption[]>([]);
  const [animating, setAnimating] = useState(false);
  const [optionSize, setOptionSize] = useState<[number, number]>([5, 10]);
  const [semiDisappearing, setSemiDisappearing] = useState(false);
  const [prevSelectedItem, setPrevSelectedItem] = useState<number>(1);
  const [isFastScrolling, setIsFastScrolling] = useState(false);
  
  const { play: playClickSound } = useSound('/sounds/сlick2.wav', 0.5);
  
  const holdTimeoutRef = useRef<number | null>(null);
  const holdIntervalRef = useRef<number | null>(null);
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const isHoldingRef = useRef<boolean>(false);
  const handlersRef = useRef<{
    horizontal: (dir: 'l' | 'r') => void;
    vertical: (dir: 'u' | 'd') => void;
  } | null>(null);

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

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setVisuallySelectedItem(selectedItem);
    }, 0);

    return () => {
      clearTimeout(timerId);
    };
  }, [selectedItem]);
  
  const handleHorizontal = (dir: 'l' | 'r') => {
    if (!isHoldingRef.current && (animating || semiDisappearing)) return;
    if (dir === 'l' && selectedItem > 0) {
      playClickSound();
      setSemiDisappearing(true);
      setPrevSelectedItem(selectedItem);
      setTimeout(() => {
        setSemiDisappearing(false);
      }, isHoldingRef.current ? 0 : 113);
      setSelectedItem(prev => prev - 1);
      setSelectedSemiItem(0);
      setOutMassive([]);
      setOffsetX(prev => prev + optionSize[1]);
      if (selectedItem - 1 === 0) {
        setIsFastScrolling(false);
      }
    } else if (dir === 'l' && selectedItem === 0) {
      setIsFastScrolling(false);
    }
    if (dir === 'r' && selectedItem < items.length - 1) {
      playClickSound();
      setSemiDisappearing(true);
      setPrevSelectedItem(selectedItem);
      setTimeout(() => {
        setSemiDisappearing(false);
      }, isHoldingRef.current ? 0 : 113);
      setSelectedItem(prev => prev + 1);
      setSelectedSemiItem(0);
      setOutMassive([]);
      setOffsetX(prev => prev - optionSize[1]);
      if (selectedItem + 1 === items.length - 1) {
        setIsFastScrolling(false);
      }
    } else if (dir === 'r' && selectedItem === items.length - 1) {
      setIsFastScrolling(false);
    }
  };

  const handleVertical = (dir: 'u' | 'd') => {
    if (!isHoldingRef.current && animating) return;
    if (dir === 'u' && selectedSemiItem < items[selectedItem].semiOptions.length - 1) {
      playClickSound();
      const current = items[selectedItem].semiOptions[selectedSemiItem];
      if (!isHoldingRef.current) {
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
      } else {
        setSelectedSemiItem((prev) => prev + 1);
        setOutMassive((prev) => [current, ...prev]);
      }
      if (selectedSemiItem + 1 === items[selectedItem].semiOptions.length - 1) {
        setIsFastScrolling(false);
      }
    } else if (dir === 'u' && selectedSemiItem === items[selectedItem].semiOptions.length - 1) {
      setIsFastScrolling(false);
    }

    if (dir === 'd' && selectedSemiItem > 0) {
      playClickSound();
      if (!isHoldingRef.current) {
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
      } else {
        setSelectedSemiItem((prev) => prev - 1);
        setOutMassive((prev) => prev.slice(0, -1));
      }
      if (selectedSemiItem - 1 === 0) {
        setIsFastScrolling(false);
      }
    } else if (dir === 'd' && selectedSemiItem === 0) {
      setIsFastScrolling(false);
    }
  };
  
  handlersRef.current = {
    horizontal: handleHorizontal,
    vertical: handleVertical
  };

  useEffect(() => {
    const clearHoldTimers = () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      isHoldingRef.current = false;
      setIsFastScrolling(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (pressedKeysRef.current.has(key)) {
        event.preventDefault();
        return;
      }
      if (pressedKeysRef.current.size > 0) {
        event.preventDefault();
        return;
      }
      pressedKeysRef.current.add(key);
      const executeAction = () => {
        if (!handlersRef.current) return;
        switch (key) {
          case 'ArrowLeft':
            handlersRef.current.horizontal('l');
            break;
          case 'ArrowRight':
            handlersRef.current.horizontal('r');
            break;
          case 'ArrowUp':
            handlersRef.current.vertical('u');
            break;
          case 'ArrowDown':
            handlersRef.current.vertical('d');
            break;
        }
      };
      switch (key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          clearHoldTimers();
          isHoldingRef.current = false;
          executeAction();
          holdTimeoutRef.current = window.setTimeout(() => {
            isHoldingRef.current = true;            
            executeAction();
            setIsFastScrolling(true);
            holdIntervalRef.current = window.setInterval(() => {
              executeAction();
            }, 70);
          }, 300);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      pressedKeysRef.current.delete(key);
      switch (key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
          clearHoldTimers();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearHoldTimers();
    };
  }, []);

  return (
    <div className="wallpaper-container">
      <div className="app">
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(${offsetX}vw)`,
            transition: 'transform 0.37s cubic-bezier(0.2, 0.9, 0.22, 1)'
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
                    <img src={outvalue.icon} alt={outvalue.icon} />
                  </div>
                ))}
              </div>
              <div
                className={_index === visuallySelectedItem ? 'item-main selected' : 'item-main'}
                // style={{ backgroundColor: 'yellow' }}
              >
                <div
                  style={{
                    width: isFastScrolling ? '100%' : (_index === visuallySelectedItem ? '110%' : '100%')
                    // backgroundColor: 'yellow'
                  }}>
                  <img
                    alt={value.icon}
                    src={value.icon}
                    className={_index === selectedItem ? undefined : 'dimmed'}
                    style={{
                      opacity: _index === selectedItem ? 1 : 0.7,
                      transform: isFastScrolling ? 'scale(1)' : (_index === visuallySelectedItem ? 'scale(1.2)' : 'scale(1)'),
                      transition: 
                         'filter 0.2s cubic-bezier(0.2, 0.9, 0.22, 1), opacity 0.2s cubic-bezier(0.2, 0.9, 0.22, 1), transform 0.2s cubic-bezier(0.2, 0.9, 0.22, 1)'
                    }}
                  />
                  <p
                    style={{
                      opacity: _index === selectedItem ? '1' : '0',
                      // backgroundColor: 'yellow'
                    }}>
                    {value.name}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--gap-size)',
                  marginTop: 'var(--gap-size)'
                }}>
                {_index === prevSelectedItem && semiDisappearing &&
                  value.semiOptions.map((semivalue: SemiOption, _semiindex: number) => (
                    <div key={`prev-${_semiindex}`} style={{position:'relative'}} className="semi-disappear">
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
                            opacity: 1,
                            borderRightColor: 'yellow'
                          }}
                        />
                      </div>
                      {_semiindex === 0 && 
                      (<div style={{position:'absolute', left:'100%', top:'50%', transform:'translateY(-50%)', marginLeft:'-30px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}} >
                        <p style={{
                          color:'#fff', 
                          whiteSpace:'nowrap', 
                          margin:0, 
                          padding:0,
                          fontSize: 'calc(var(--base-size) * 2.5)',
                          textShadow: 'calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) rgba(0, 0, 0, 0.8), calc(var(--base-size) * -0.3) calc(var(--base-size) * -0.3) calc(var(--base-size) * 0.5) rgba(255, 255, 255, 0.4)'
                        }}>{semivalue.name}</p>
                        {semivalue.name === 'Memory Stick' && (
                          <>
                            <div style={{backgroundColor:'white', width:'2000px', height:'2px', marginTop:'0px'}}> </div>
                            <p style={{
                              color:'#fff', 
                              whiteSpace:'nowrap', 
                              margin:0, 
                              padding:0,
                              fontSize: 'calc(var(--base-size) * 2.5)',
                              textShadow: 'calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) rgba(0, 0, 0, 0.8), calc(var(--base-size) * -0.3) calc(var(--base-size) * -0.3) calc(var(--base-size) * 0.5) rgba(255, 255, 255, 0.4)',
                              marginTop:'0px'
                            }}>Free Space 1790 MB</p>
                          </>
                        )}
                      </div>)}
                    </div>
                  ))}
                {_index === selectedItem &&
                  value.semiOptions.map((semivalue: SemiOption, _semiindex: number) => (
                    <div key={_semiindex} style={{position:'relative'}}>
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
                      {_semiindex === selectedSemiItem && 
                      (<div style={{position:'absolute', left:'100%', top:'50%', transform:'translateY(-50%)', marginLeft:'-30px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}} >
                        <p style={{
                          color:'#fff', 
                          whiteSpace:'nowrap', 
                          margin:0, 
                          padding:0,
                          fontSize: 'calc(var(--base-size) * 2.5)',
                          textShadow: 'calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) rgba(0, 0, 0, 0.8), calc(var(--base-size) * -0.3) calc(var(--base-size) * -0.3) calc(var(--base-size) * 0.5) rgba(255, 255, 255, 0.4)'
                        }}>{semivalue.name}</p>
                        {semivalue.name === 'Memory Stick' && (
                          <>
                            <div style={{backgroundColor:'white', width:'2000px', height:'2px', marginTop:'0px'}}> </div>
                            <p style={{
                              color:'#fff', 
                              whiteSpace:'nowrap', 
                              margin:0, 
                              padding:0,
                              fontSize: 'calc(var(--base-size) * 2.5)',
                              textShadow: 'calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) calc(var(--base-size) * 0.8) rgba(0, 0, 0, 0.8), calc(var(--base-size) * -0.3) calc(var(--base-size) * -0.3) calc(var(--base-size) * 0.5) rgba(255, 255, 255, 0.4)',
                              marginTop:'0px'
                            }}>Free Space 1790 MB</p>
                          </>
                        )}
                      </div>)}
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
