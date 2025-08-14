import React from 'react';
import { DollarSign, Target, AlertTriangle, BarChart3 } from 'lucide-react';

const KeyMetrics = ({ portfolioMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ${portfolioMetrics.totalValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Target className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Sharpe Ratio</p>
            <p className="text-2xl font-bold text-gray-900">
              {portfolioMetrics.sharpeRatio.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-yellow-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Value at Risk (95%)</p>
            <p className="text-2xl font-bold text-red-600">
              ${portfolioMetrics.valueAtRisk.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Risk Level</p>
            <p className="text-2xl font-bold text-gray-900">
              {portfolioMetrics.riskScore.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
