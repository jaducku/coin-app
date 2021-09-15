
import './App.css';
import React, { useState } from 'react';
import { API } from 'aws-amplify';

function App() {
  const [coins, updateCoins] = useState([]);
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  function updateInputvalue(type, value) {
    updateInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    const { limit, start } = input;

    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins);
  }

  return (
    <div className="App">
      <div>
        <input onChange={e => updateInputvalue('start', e.target.value)}
          placeholder="start" />
        <input onChange={e => updateInputvalue('limit', e.target.value)}
          placeholder="limit" />
        <button onClick={fetchCoins}>Fetch</button>
      </div>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;
