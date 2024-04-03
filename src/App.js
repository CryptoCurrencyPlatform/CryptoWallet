import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css'; // Import the CSS
import NewsTicker from './components/News'; // Import the News components

function CoinDetails({ coin, history }) {
  // Prepare the data for the line chart
  const chartData = history.map(dataPoint => ({ date: new Date(dataPoint[0]).toDateString(), price: dataPoint[1] }));
  const priceChangeColor = coin.price_change_24h < 0 ? 'red' : 'green';

  return (
    <div className="coin-details">
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <span style={{ color: priceChangeColor, fontSize: '0.8em' }}>
          {coin.price_change_24h > 0 && '+'}{coin.price_change_24h?.toFixed(2)}%
        </span>
        <p style={{ fontSize: '2em', margin: 0 }}>
          Current Price: ${coin.current_price?.toFixed(2)}
        </p>
      </div>
      <h2>Historical Data</h2>
      <LineChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

const holdingsData = [
  { id: 'bitcoin', symbol: 'BTC', amount: 0.5, cost_basis: 30000 }, // replace with actual data
  { id: 'ethereum', symbol: 'ETH', amount: 2, cost_basis: 1500 },
  { id: 'litecoin', symbol: 'LTC', amount: 1, cost_basis: 1500 },// replace with actual data
  // add more coins here...
];

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const api_key = 'CG-QC4nGogMEck7vDeuvmnaW5Ww'; 

  const holdings = useMemo(() => holdingsData, []);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${holdings.map(holding => holding.id).join(',')}`, {
      headers: {
        'X-CoinAPI-Key': api_key
      }
    })
      .then(response => {
        const updatedHoldings = holdings.map(holding => {
          const coin = response.data.find(coin => coin.id === holding.id);
          return {
            ...holding,
            name: coin.name,
            current_price: coin.current_price,
            price_change_24h: coin.price_change_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h
          };
        });
        setCoins(updatedHoldings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [holdings]);

  const handleCoinSelect = (id) => {
    setLoading(true);
    const selected = coins.find(coin => coin.id === id);
    setSelectedCoin(selected);
  
    // Fetch historical data for the selected date range
    const promises = [];
    const date = new Date(startDate);
    while (date <= endDate) {
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
      const promise = axios.get(`http://localhost:3001/api/v3/coins/${id}/history?date=${formattedDate}`, {
        headers: {
          'X-CoinAPI-Key': api_key
        }
      })
        .then(response => {
          const price = response.data.market_data.current_price.usd;
          return [Date.parse(formattedDate), price];
        })
        .catch(error => {
          console.error('Error fetching historical data', error);
          return [Date.parse(formattedDate), 0]; // Return a default value
        });
  
      promises.push(promise);
      date.setDate(date.getDate() + 1); // Increment the date
    }
  
    Promise.all(promises)
      .then(history => {
        setHistory(history);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <NewsTicker />
        <h1>Crypto Dashboard</h1>
        {loading ? (
          <p style={{color: 'white'}}>Loading...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '100%' }}>
              <div style={{ flex: 1, border: '1px solid black', margin: '10px', padding: '20px', borderRadius: '10px', boxSizing: 'border-box' }}>
                <h2>Trends</h2>
                <select value={selectedCoin ? selectedCoin.id : ''} onChange={e => handleCoinSelect(e.target.value)}>
                  {coins.map(coin => (
                    <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                  ))}
                </select>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                {selectedCoin && <CoinDetails coin={selectedCoin} history={history} />}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;