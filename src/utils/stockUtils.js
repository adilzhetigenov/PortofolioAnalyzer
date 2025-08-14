export const getStockVolatility = (symbol) => {
  const volatilities = { 'AAPL': 0.02, 'MSFT': 0.018, 'GOOGL': 0.025, 'TSLA': 0.04 };
  return volatilities[symbol] || 0.02;
};

export const generateHistoricalPrices = (currentPrice, days) => {
  const prices = [];
  let price = currentPrice;
  for (let i = days; i > 0; i--) {
    const change = (Math.random() - 0.5) * 0.03 * price;
    price = Math.max(price + change, 0.01);
    prices.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: Number(price.toFixed(2))
    });
  }
  return prices;
};

export const getRiskColor = (risk) => {
  if (risk < 3) return 'text-green-600';
  if (risk < 7) return 'text-yellow-600';
  return 'text-red-600';
};

export const getRiskLabel = (risk) => {
  if (risk < 3) return 'Low Risk';
  if (risk < 7) return 'Moderate Risk';
  return 'High Risk';
};
