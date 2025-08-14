import { useCallback } from 'react';
import { getStockVolatility, generateHistoricalPrices } from '../utils/stockUtils';

export const useMarketData = (portfolio, setPortfolio) => {
  const updateMarketData = useCallback(() => {
    setPortfolio(prev => prev.map(stock => {
      // Simulate price movements
      const volatility = getStockVolatility(stock.symbol);
      const priceChange = (Math.random() - 0.5) * volatility * stock.price;
      const newPrice = Math.max(stock.price + priceChange, 0.01);
      
      // Generate historical data for risk calculations
      const historical = generateHistoricalPrices(stock.price, 30);
      
      return {
        ...stock,
        price: Number(newPrice.toFixed(2)),
        historicalPrices: historical,
        change: Number(priceChange.toFixed(2)),
        changePercent: Number(((priceChange / stock.price) * 100).toFixed(2))
      };
    }));
  }, [setPortfolio]);

  return { updateMarketData };
};
