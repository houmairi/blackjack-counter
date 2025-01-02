import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Game } from './Game';
import SimulationControls from './simulation-controls';
import TrueCountTooltip from './TrueCountTooltip';
import WinRatesTable from './WinRatesTable';

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
      } finally {
        setIsSimulating(false);
      }
    }, 0);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-sm text-gray-500 text-right">
        Made by houmairi - <a href="https://github.com/houmairi/blackjack-counter" className="text-blue-500 hover:text-blue-700 underline">check out this project on GitHub</a>
      </div>
      <SimulationControls
        onStart={runSimulation}
        isSimulating={isSimulating}
      />

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
            <WinRatesTable 
              winRateByCount={gameData.stats.winRateByCount}
              handsByCount={gameData.stats.handsByCount}  // You'll need to add this to your Game class
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h3 className="text-lg font-bold mb-4">Bankroll Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gameData.data}
                margin={{ top: 20, right: 60, bottom: 40, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hand" 
                  label={{ value: 'Hand Number', position: 'bottom', offset: 20 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Bankroll (€)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -40 
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '20px' }} align="left" />
                <Line type="monotone" dataKey="bankroll" stroke="#2563eb" name="Bankroll" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96">
            <h3 className="text-lg font-bold mb-4">True Count and Bet Size</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gameData.data}
                margin={{ top: 20, right: 60, bottom: 40, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hand" 
                  label={{ value: 'Hand Number', position: 'bottom', offset: 20 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left" 
                  label={{ 
                    value: 'True Count', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -40 
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  label={{ 
                    value: 'Bet Size (€)', 
                    angle: 90, 
                    position: 'insideRight',
                    offset: -40 
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<TrueCountTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} align="left" />
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