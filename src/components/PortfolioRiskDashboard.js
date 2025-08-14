import React, { useState, useEffect } from 'react';
import { usePortfolioMetrics } from '../hooks/usePortfolioMetrics';
import { useMarketData } from '../hooks/useMarketData';
import KeyMetrics from './KeyMetrics';
import RiskAlert from './RiskAlert';
import PortfolioCharts from './PortfolioCharts';
import HoldingsTable from './HoldingsTable';
import AddStockForm from './AddStockForm';
import { generateHistoricalPrices } from '../utils/stockUtils';

const PortfolioRiskDashboard = () => {
  const [portfolio, setPortfolio] = useState([
    { symbol: 'AAPL', quantity: 10, price: 175.50, historicalPrices: [] },
    { symbol: 'MSFT', quantity: 8, price: 410.20, historicalPrices: [] },
    { symbol: 'GOOGL', quantity: 5, price: 142.80, historicalPrices: [] },
    { symbol: 'TSLA', quantity: 15, price: 248.90, historicalPrices: [] }
  ]);

  const [newStock, setNewStock] = useState({ symbol: '', quantity: '' });
  const [riskThreshold, setRiskThreshold] = useState(5);

  const { portfolioMetrics } = usePortfolioMetrics(portfolio);
  const { updateMarketData } = useMarketData(portfolio, setPortfolio);

  // Simulate fetching real market data
  useEffect(() => {
    updateMarketData();
    const interval = setInterval(updateMarketData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [updateMarketData]);

  const addStock = () => {
    if (newStock.symbol && newStock.quantity) {
      const price = Math.random() * 200 + 50; // Random price for demo
      setPortfolio(prev => [...prev, {
        symbol: newStock.symbol.toUpperCase(),
        quantity: parseInt(newStock.quantity),
        price: Number(price.toFixed(2)),
        historicalPrices: generateHistoricalPrices(price, 30)
      }]);
      setNewStock({ symbol: '', quantity: '' });
    }
  };

  const removeStock = (index) => {
    setPortfolio(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Risk Analytics</h1>
          <p className="text-gray-600">Real-time portfolio monitoring and risk assessment</p>
        </div>

        <KeyMetrics portfolioMetrics={portfolioMetrics} />
        
        <RiskAlert 
          riskScore={portfolioMetrics.riskScore} 
          riskThreshold={riskThreshold} 
        />

        <PortfolioCharts portfolio={portfolio} portfolioMetrics={portfolioMetrics} />

        <HoldingsTable 
          portfolio={portfolio} 
          portfolioMetrics={portfolioMetrics}
          riskThreshold={riskThreshold}
          setRiskThreshold={setRiskThreshold}
          onRemoveStock={removeStock}
        />

        <AddStockForm 
          newStock={newStock}
          setNewStock={setNewStock}
          onAddStock={addStock}
        />
      </div>
    </div>
  );
};

export default PortfolioRiskDashboard;
