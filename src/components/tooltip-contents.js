export const tooltipContent = {
    cardCounting: {
      title: "Card Counting Basics",
      description: "Card counting tracks the ratio of high cards (10,J,Q,K,A) to low cards (2-6) remaining in the deck.",
      examples: [
        "True Count = Running Count ÷ Decks Remaining",
        "High cards (10-A) = -1, Low cards (2-6) = +1, 7-9 = 0"
      ],
      tips: [
        "A positive count means more high cards remain (favorable)",
        "Higher true counts justify larger bets",
        "Most casinos use 6-8 decks to make counting harder"
      ]
    },
    
    bettingStrategy: {
      title: "Betting Strategy",
      description: "Your bet size should correlate with your advantage, which is indicated by the true count.",
      examples: [
        "True Count 1 or less: Minimum bet (base unit)",
        "True Count 2: 2x base unit",
        "True Count 3+: Progressive increase based on advantage"
      ],
      tips: [
        "Never bet more than 5-10% of your bankroll on one hand",
        "Maintain enough bankroll for at least 100 base units",
        "Consider table limits when setting your base unit"
      ]
    },
  
    penetration: {
      title: "Deck Penetration",
      description: "The percentage of cards dealt before shuffling. Higher penetration gives more opportunities for profitable situations.",
      examples: [
        "75% penetration: In 6 decks, shuffle after ~4.5 decks dealt",
        "85% penetration: Optimal but rare in casinos"
      ],
      tips: [
        "Look for tables with better penetration (>70%)",
        "Deeper penetration means more high-count situations",
        "Most casinos shuffle at 65-75% penetration"
      ]
    },
  
    bankrollManagement: {
      title: "Bankroll Management",
      description: "Proper bankroll management is crucial for long-term survival and success.",
      examples: [
        "€10,000 bankroll → €100 base unit reasonable",
        "Maximum bet should not exceed 5% of total bankroll"
      ],
      tips: [
        "Always maintain at least 100x base unit",
        "Consider reducing bets after significant losses",
        "Track win/loss variance to adjust bet sizing"
      ]
    }
  };