import { useEffect, useState } from 'react';
import './styles.css';

export const InterfaceHeader = () => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<number>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    const updateDateTime = () => {
      const data = new Date();
      setDate(data.getDate());
      setMonth(data.getMonth() + 1);
      setTime(
        data.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainBlock">
      <div className="date">
        {month}/{date}
      </div>
      <div className="time">{time}</div>
      <div className="battery">
        <div className="battery-part"></div>
        <div className="battery-content">
          <div className="division"></div>
          <div className="division"></div>
          <div className="division"></div>
        </div>
      </div>
    </div>
  );
};
