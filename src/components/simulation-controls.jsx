import React, { useState } from 'react';
import EnhancedTooltip from './EnhancedTooltip';
import { tooltipContent } from './tooltip-contents';

const Tooltip = ({ text }) => (
  <div className="group relative inline-block ml-2">
    <span className="cursor-help text-gray-500">ⓘ</span>
    <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-sm bg-gray-900 text-white rounded-md shadow-lg -left-20 top-full">
      {text}
    </div>
  </div>
);

const SimulationControls = ({ onStart, isSimulating }) => {
  const [settings, setSettings] = useState({
    numDecks: 6,
    numHands: 1000,
    bankroll: 10000,
    baseUnit: 100,
    maxBetPercent: 5,
    penetration: 75,
  });

  const tooltips = {
    numDecks: "Number of card decks used in the shoe. More decks make counting harder as each card has less impact.",
    numHands: "Total rounds to simulate. More hands provide better long-term results. Recommended: 1000+ hands.",
    bankroll: "Your starting money. Should be at least 100x your base betting unit to handle losing streaks.",
    baseUnit: "Your minimum bet size when the count isn't favorable. Used when true count is 1 or less.",
    maxBetPercent: "Maximum bet as % of bankroll. Helps protect from betting too much on a single hand.",
    penetration: "How deep into the deck(s) before shuffling. Higher % is better for counting but less common in casinos."
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleStart = () => {
    onStart(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full mb-6">
      <h2 className="text-xl font-bold mb-4">
        Simulation Settings
        <EnhancedTooltip {...tooltipContent.cardCounting}>ⓘ</EnhancedTooltip>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Number of Decks: {settings.numDecks}
            <EnhancedTooltip {...tooltipContent.cardCounting}>ⓘ</EnhancedTooltip>
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={settings.numDecks}
            onChange={(e) => handleChange('numDecks', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Number of Hands
            <Tooltip text={tooltips.numHands} />
          </label>
          <input
            type="number"
            value={settings.numHands}
            onChange={(e) => handleChange('numHands', parseInt(e.target.value))}
            min="100"
            max="10000"
            step="100"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Starting Bankroll (€)
            <EnhancedTooltip {...tooltipContent.bankrollManagement}>ⓘ</EnhancedTooltip>
          </label>
          <input
            type="number"
            value={settings.bankroll}
            onChange={(e) => handleChange('bankroll', parseInt(e.target.value))}
            min="1000"
            step="1000"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Base Betting Unit (€)
            <EnhancedTooltip {...tooltipContent.bettingStrategy}>ⓘ</EnhancedTooltip>
          </label>
          <input
            type="number"
            value={settings.baseUnit}
            onChange={(e) => handleChange('baseUnit', parseInt(e.target.value))}
            min="25"
            step="25"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Max Bet (% of Bankroll): {settings.maxBetPercent}%
            <EnhancedTooltip {...tooltipContent.bankrollManagement}>ⓘ</EnhancedTooltip>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={settings.maxBetPercent}
            onChange={(e) => handleChange('maxBetPercent', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Deck Penetration (%): {settings.penetration}%
            <EnhancedTooltip {...tooltipContent.penetration}>ⓘ</EnhancedTooltip>
          </label>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={settings.penetration}
            onChange={(e) => handleChange('penetration', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleStart}
          disabled={isSimulating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg shadow transition-colors"
        >
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;