import React, { useState } from 'react';

const WinRatesTable = ({ winRateByCount, handsByCount }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'asc' });

  const sortedData = React.useMemo(() => {
    const data = Object.entries(winRateByCount).map(([count, rate]) => ({
      count: parseInt(count),
      rate: parseFloat(rate),
      hands: handsByCount[count] || 0,
      wins: Math.round((handsByCount[count] || 0) * (rate / 100))
    }));

    return data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [winRateByCount, handsByCount, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('count')}
            >
              True Count {sortConfig.key === 'count' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('rate')}
            >
              Win Rate {sortConfig.key === 'rate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('hands')}
            >
              Total Hands {sortConfig.key === 'hands' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('wins')}
            >
              Wins {sortConfig.key === 'wins' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(({ count, rate, hands, wins }) => (
            <tr 
              key={count}
              className="hover:bg-gray-50 border-b"
            >
              <td className="px-4 py-2 text-center font-medium">{count}</td>
              <td className="px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                  <div 
                    className="w-full bg-gray-200 rounded-full h-2 mr-2"
                    title={`${rate}% win rate`}
                  >
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  {rate.toFixed(1)}%
                </div>
              </td>
              <td className="px-4 py-2 text-center">{hands}</td>
              <td className="px-4 py-2 text-center">{wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinRatesTable;