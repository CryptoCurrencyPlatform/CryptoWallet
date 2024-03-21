import { useState, useEffect } from 'react';
import { fetchExchangeRates } from './APIenter'; // Import the API function

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const exchangeRates = await fetchExchangeRates();
        setPortfolio(exchangeRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }
    fetchPortfolio();
  }, []);

  return portfolio;
}