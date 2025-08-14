import React from 'react';

const AddStockForm = ({ newStock, setNewStock, onAddStock }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock</h3>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Stock Symbol (e.g., NVDA)"
          value={newStock.symbol}
          onChange={(e) => setNewStock({...newStock, symbol: e.target.value})}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newStock.quantity}
          onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onAddStock}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Stock
        </button>
      </div>
    </div>
  );
};

export default AddStockForm;
