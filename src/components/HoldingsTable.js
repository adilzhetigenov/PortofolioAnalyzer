import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const HoldingsTable = ({ portfolio, portfolioMetrics, riskThreshold, setRiskThreshold, onRemoveStock }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Holdings</h3>
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm text-gray-600">Risk Threshold: </label>
              <input 
                type="number" 
                value={riskThreshold} 
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
                min="1" 
                max="10"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Change</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Market Value</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Weight</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                  <td className="py-3 px-4">{stock.quantity}</td>
                  <td className="py-3 px-4">${stock.price}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {stock.changePercent?.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">${(stock.price * stock.quantity).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {((stock.price * stock.quantity) / portfolioMetrics.totalValue * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => onRemoveStock(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;
