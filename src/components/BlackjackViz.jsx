import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Game } from './Game';
import SimulationControls from './simulation-controls';
import TrueCountTooltip from './TrueCountTooltip';

const BlackjackSimulation = () => {
  const [gameData, setGameData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const runSimulation = (settings) => {
    setIsSimulating(true);
    setTimeout(() => {
      try {
        const game = new Game(settings);
        const stats = game.simulateSession(settings.numHands);
        const data = game.history.map((hand, index) => ({
          hand: index + 1,
          trueCount: parseFloat(hand.trueCount),
          bankroll: hand.bankroll,
          bet: hand.bet,
          dealerUpcard: hand.dealerUpcard,
          playerCards: hand.playerCards.join(',')
        }));
        
        setGameData({ stats, data });
      } catch (error) {
        console.error('Simulation error:', error);
        // Optionally add a state for error handling and display it to the user
      } finally {
        setIsSimulating(false);
      }
    }, 0);
  };

  return (
    <div className="p-4 space-y-6">
      <SimulationControls 
        onStart={runSimulation}
        isSimulating={isSimulating}
      />
      <div className="flex justify-center mb-6">
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg shadow transition-colors"
        >
          {isSimulating ? 'Simulating...' : 'Run New Simulation'}
        </button>
      </div>

      {isSimulating ? (
        <div className="text-center py-8">Running simulation...</div>
      ) : gameData ? (
        <>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Simulation Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Total Hands: {gameData.stats.totalHands}</p>
                <p className="font-semibold">Win Rate: {((gameData.stats.winningHands / gameData.stats.totalHands) * 100).toFixed(1)}%</p>
                <p className="font-semibold">Total Profit: €{gameData.stats.totalProfit}</p>
              </div>
              <div>
                <p className="font-semibold">Average True Count: {gameData.stats.avgTrueCount.toFixed(2)}</p>
                <p className="font-semibold">Maximum Bet: €{gameData.stats.maxBet}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Win Rates by True Count</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(gameData.stats.winRateByCount).map(([count, rate]) => (
                <div key={count} className="flex justify-between">
                  <span>Count {count}:</span>
                  <span>{rate}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h3 className="text-lg font-bold mb-4">Bankroll Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gameData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hand" label={{ value: 'Hand Number', position: 'bottom' }} />
                <YAxis label={{ value: 'Bankroll (€)', angle: -90, position: 'left' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bankroll" stroke="#2563eb" name="Bankroll" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h3 className="text-lg font-bold mb-4">True Count and Bet Size</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gameData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hand" label={{ value: 'Hand Number', position: 'bottom' }} />
                <YAxis yAxisId="left" label={{ value: 'True Count', angle: -90, position: 'left' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Bet Size (€)', angle: 90, position: 'right' }} />
                <Tooltip content={<TrueCountTooltip />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="trueCount" stroke="#10b981" name="True Count" />
                <Line yAxisId="right" type="monotone" dataKey="bet" stroke="#f59e0b" name="Bet Size" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-8">Click the button above to run a simulation</div>
      )}
    </div>
  );
};

export default BlackjackSimulation;