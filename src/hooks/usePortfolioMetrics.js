import { useMemo } from 'react';

export const usePortfolioMetrics = (portfolio) => {
  const portfolioMetrics = useMemo(() => {
    const totalValue = portfolio.reduce((sum, stock) => sum + (stock.price * stock.quantity), 0);
    
    // Calculate daily returns for each stock
    const returns = portfolio.map(stock => {
      if (stock.historicalPrices.length < 2) return [];
      return stock.historicalPrices.slice(1).map((price, i) => 
        (price.price - stock.historicalPrices[i].price) / stock.historicalPrices[i].price
      );
    });

    // Portfolio returns
    const portfolioReturns = returns[0]?.map((_, i) => 
      portfolio.reduce((sum, stock, stockIndex) => {
        const weight = (stock.price * stock.quantity) / totalValue;
        return sum + (returns[stockIndex]?.[i] || 0) * weight;
      }, 0)
    ) || [];

    // Risk metrics
    const avgReturn = portfolioReturns.reduce((a, b) => a + b, 0) / portfolioReturns.length || 0;
    const variance = portfolioReturns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / portfolioReturns.length || 0;
    const volatility = Math.sqrt(variance * 252); // Annualized
    
    // Value at Risk (95% confidence)
    const sortedReturns = [...portfolioReturns].sort((a, b) => a - b);
    const varIndex = Math.floor(sortedReturns.length * 0.05);
    const valueAtRisk = sortedReturns[varIndex] ? Math.abs(sortedReturns[varIndex] * totalValue) : 0;

    // Sharpe Ratio (assuming 2% risk-free rate)
    const riskFreeRate = 0.02;
    const sharpeRatio = volatility > 0 ? (avgReturn * 252 - riskFreeRate) / volatility : 0;

    return {
      totalValue,
      volatility: volatility * 100,
      valueAtRisk,
      sharpeRatio,
      avgReturn: avgReturn * 100,
      riskScore: Math.min(volatility * 100 / 0.2 * 10, 10) // Scale to 1-10
    };
  }, [portfolio]);

  return { portfolioMetrics };
};
