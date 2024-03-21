import axios from 'axios';

const API_KEY = 'B12DC146-234E-4530-9041-0E56EC79439C';

export async function fetchExchangeRates() {
  const assets = ['BTC', 'ETH', 'XRP'];
  const promises = assets.map(asset =>
    axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=${API_KEY}`)
  );
  try {
    const responses = await Promise.all(promises);
    return responses.reduce((acc, response, index) => {
      acc[assets[index]] = response.data.rate;
      return acc;
    }, {});
  } catch (error) {
    throw new Error("Error fetching exchange rates:", error);
  }
}