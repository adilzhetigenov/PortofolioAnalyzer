import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PortfolioCharts = ({ portfolio, portfolioMetrics }) => {
  // Data for charts
  const portfolioComposition = portfolio.map(stock => ({
    name: stock.symbol,
    value: stock.price * stock.quantity,
    percentage: ((stock.price * stock.quantity) / portfolioMetrics.totalValue * 100).toFixed(1)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const performanceData = portfolio[0]?.historicalPrices.map((_, index) => ({
    date: portfolio[0].historicalPrices[index].date,
    portfolioValue: portfolio.reduce((sum, stock) => 
      sum + (stock.historicalPrices[index]?.price || stock.price) * stock.quantity, 0
    )
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Portfolio Performance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
            <Line type="monotone" dataKey="portfolioValue" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Portfolio Composition */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={portfolioComposition}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {portfolioComposition.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioCharts;
