import React, { useState } from 'react';

interface MarketData {
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  volume: number;
  prediction: string;
}

const MarketAnalysis: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [loading, setLoading] = useState(false);

  // Mock market data
  const marketData: MarketData = {
    trend: 'up',
    percentage: 12.5,
    volume: 1234567,
    prediction: 'Positive growth expected in the next 24 hours',
  };

  const metrics = [
    {
      name: 'Success Rate',
      value: '98.5%',
      description: 'Overall success rate of CPN validations',
      icon: 'check-circle',
    },
    {
      name: 'Average Processing Time',
      value: '2.3 days',
      description: 'Average time to process CPN requests',
      icon: 'clock',
    },
    {
      name: 'Market Volume',
      value: marketData.volume.toLocaleString(),
      description: 'Total CPNs processed in selected timeframe',
      icon: 'chart-line',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Market Analysis
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe('day')}
              className={`px-4 py-2 rounded-lg ${
                timeframe === 'day'
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-lg ${
                timeframe === 'week'
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-lg ${
                timeframe === 'month'
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-gray-50 rounded-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className={`fas fa-${metric.icon} text-primary-600 text-xl`}></i>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {metric.name}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    metric.name === 'Success Rate'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {timeframe}
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trend */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Market Trend</h2>
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 ${
              marketData.trend === 'up'
                ? 'text-green-600'
                : marketData.trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            <i
              className={`fas fa-arrow-${
                marketData.trend === 'up'
                  ? 'up'
                  : marketData.trend === 'down'
                  ? 'down'
                  : 'right'
              } text-2xl`}
            ></i>
            <span className="text-2xl font-semibold">
              {marketData.percentage}%
            </span>
          </div>
          <p className="text-gray-600">{marketData.prediction}</p>
        </div>
      </div>

      {/* Placeholder for Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Historical Performance
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
