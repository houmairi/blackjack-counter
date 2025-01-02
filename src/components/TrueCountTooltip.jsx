import React from 'react';

const TrueCountTooltip = ({ active, payload, label }) => {
  console.log('Tooltip props:', { active, payload, label }); // Debug line
  if (!active || !payload || !payload.length) {
    return null;
  }

  const trueCount = payload.find(p => p.dataKey === 'trueCount')?.value;
  const betSize = payload.find(p => p.dataKey === 'bet')?.value;

  const getTrueCountExplanation = (count) => {
    if (count === undefined) return '';
    
    const countNum = parseFloat(count);
    let explanation = `The true count of ${countNum.toFixed(1)} represents the running count divided by the remaining decks. `;
    
    // Add strategic implications based on the count
    if (countNum <= -2) {
      explanation += "This negative count indicates many high cards (10s, face cards, aces) have been played. The house has a stronger advantage. Conservative betting is recommended.";
    } else if (countNum > -2 && countNum < 1) {
      explanation += "This neutral count suggests a relatively balanced deck composition. Basic strategy provides the best approach.";
    } else if (countNum >= 1 && countNum < 3) {
      explanation += "This positive count indicates more high cards remain, slightly favoring the player. Consider moderate bet increases.";
    } else if (countNum >= 3) {
      explanation += "This high positive count shows many low cards have been played, leaving more high cards. This presents a strong player advantage.";
    }

    // Add betting correlation if bet size is available
    if (betSize !== undefined) {
      explanation += `\n\nCurrent bet size: €${betSize}`;
    }

    return explanation;
  };

  return (
    <div className="bg-white p-4 border rounded">
      <div>
        <p className="font-bold">Hand {label}</p>
        <p className="mt-1">
          {getTrueCountExplanation(trueCount)}
        </p>
      </div>
    </div>
  );
};

export default TrueCountTooltip;