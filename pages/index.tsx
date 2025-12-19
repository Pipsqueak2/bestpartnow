import { useState } from 'react';
import vancouverData from '../data/vancouver.json';

export default function Recommendation() {
  const [time, setTime] = useState('1_2_hours');
  const [energy, setEnergy] = useState('low');
  const [weather, setWeather] = useState('clear');
  const [group, setGroup] = useState('solo');

  function getRecommendation() {
    const filtered = vancouverData.experiences.filter(exp =>
      exp.time.includes(time) &&
      exp.energy.includes(energy) &&
      exp.weather.includes(weather)
    );

    const riskMap: Record<string, number> = { 'very_low': 0, 'low': 1, 'medium': 2, 'high': 3 };
    filtered.sort((a, b) => riskMap[a.regret_risk] - riskMap[b.regret_risk]);

    return {
      primary: filtered[0],
      fallback: filtered[1] || null
    };
  }

  const { primary, fallback } = getRecommendation();

  return (
    <div style={{ padding: 20 }}>
      <h1>Vancouver Decision Engine</h1>

      <div>
        <label>Time Available:</label>
        <select onChange={e => setTime(e.target.value)} value={time}>
          <option value="1_2_hours">1-2 Hours</option>
          <option value="half_day">Half Day</option>
          <option value="full_day">Full Day</option>
        </select>
      </div>

      <div>
        <label>Energy Level:</label>
        <select onChange={e => setEnergy(e.target.value)} value={energy}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label>Weather:</label>
        <select onChange={e => setWeather(e.target.value)} value={weather}>
          <option value="clear">Clear</option>
          <option value="rain">Rain</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div>
        <label>Group:</label>
        <select onChange={e => setGroup(e.target.value)} value={group}>
          <option value="solo">Solo</option>
          <option value="couple">Couple</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
        </select>
      </div>

      <h2>Recommendation:</h2>
      {primary && (
        <div>
          <strong>{primary.name}</strong>
          <p>{primary.regret_message}</p>
        </div>
      )}

      {fallback && (
        <div>
          <strong>Fallback: {fallback.name}</strong>
          <p>{fallback.regret_message}</p>
        </div>
      )}
    </div>
  );
}
