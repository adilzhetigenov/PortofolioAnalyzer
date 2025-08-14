import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RiskAlert = ({ riskScore, riskThreshold }) => {
  if (riskScore <= riskThreshold) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">High Risk Alert</h3>
          <p className="text-sm text-red-700 mt-1">
            Your portfolio risk score ({riskScore.toFixed(1)}) exceeds your threshold ({riskThreshold}). 
            Consider rebalancing to reduce volatility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskAlert;
