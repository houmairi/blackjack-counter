class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
      this.value = this.calculateValue();
      this.count = this.calculateCount();
    }
  
    calculateValue() {
      if (this.rank === 'A') return 11;
      if (['K', 'Q', 'J'].includes(this.rank)) return 10;
      return parseInt(this.rank);
    }
  
    calculateCount() {
      if (['2','3','4','5','6'].includes(this.rank)) return 1;
      if (['10','J','Q','K','A'].includes(this.rank)) return -1;
      return 0;
    }
  }
  
  class Deck {
    constructor(numDecks = 6) {
      this.numDecks = numDecks;
      this.reset();
    }
  
    reset() {
      const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
      const suits = ['♠','♣','♥','♦'];
      this.cards = [];
      
      for (let d = 0; d < this.numDecks; d++) {
        for (const suit of suits) {
          for (const rank of ranks) {
            this.cards.push(new Card(rank, suit));
          }
        }
      }
      this.shuffle();
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    draw() {
      return this.cards.pop();
    }
  
    getRemainingCards() {
      return this.cards.length;
    }
  
    getRunningCount() {
      return this.cards.reduce((count, card) => count + card.count, 0);
    }
  
    getTrueCount() {
      const remainingDecks = Math.max(this.getRemainingCards() / 52, 1);
      return this.getRunningCount() / remainingDecks;
    }
  }
  
  export class Game {
    constructor(options = {}) {
      const {
        numDecks = 6,
        bankroll = 10000,
        baseUnit = 100,
        maxBetPercent = 5,
        penetration = 75
      } = options;
      
      // Add validation
      if (numDecks < 1 || numDecks > 8) throw new Error('Number of decks must be between 1 and 8');
      if (bankroll < 1000) throw new Error('Bankroll must be at least 1000');
      if (baseUnit < 25) throw new Error('Base unit must be at least 25');
      if (maxBetPercent < 1 || maxBetPercent > 10) throw new Error('Max bet percent must be between 1 and 10');
      if (penetration < 50 || penetration > 95) throw new Error('Penetration must be between 50 and 95');
      
      this.deck = new Deck(numDecks);
      this.history = [];
      this.bankroll = bankroll;
      this.baseUnit = baseUnit;
      this.minBet = baseUnit;
      this.maxBet = bankroll * (maxBetPercent / 100);
      this.penetrationThreshold = (100 - penetration) / 100 * numDecks * 52;
    }
  
    calculateWinRate(trueCount, dealerUpcard) {
      const baseWinRate = 0.485;
      const countEffects = {
        '2': 0.015,
        '3': 0.018,
        '4': 0.020,
        '5': 0.023,
        '6': 0.025,
        '7': 0.015,
        '8': 0.012,
        '9': 0.010,
        '10': 0.008,
        'J': 0.008,
        'Q': 0.008,
        'K': 0.008,
        'A': 0.012
      };
      
      const countEffect = countEffects[dealerUpcard.rank] || 0.02;
      return Math.min(0.65, Math.max(0.35, baseWinRate + (trueCount * countEffect)));
    }
  
    calculateBet(trueCount) {
      if (trueCount <= 1) return this.minBet;
      const betSize = this.baseUnit * Math.floor(trueCount);
      return Math.min(betSize, this.maxBet, this.bankroll);
    }
  
    simulateHand() {
      const trueCount = this.deck.getTrueCount();
      const bet = this.calculateBet(trueCount);
      
      // Deal cards
      const playerCards = [this.deck.draw(), this.deck.draw()];
      const dealerUpcard = this.deck.draw();
      
      const adjustedWinRate = this.calculateWinRate(trueCount, dealerUpcard);
      const win = Math.random() < adjustedWinRate;
      
      const result = {
        trueCount: trueCount.toFixed(2),
        bet,
        win,
        amount: win ? bet : -bet,
        remainingCards: this.deck.getRemainingCards(),
        bankroll: this.bankroll,
        dealerUpcard: dealerUpcard.rank,
        playerCards: playerCards.map(card => card.rank)
      };
      
      this.bankroll += result.amount;
      this.history.push(result);
      
      // Update this condition to use penetrationThreshold
      if (this.deck.getRemainingCards() < this.penetrationThreshold) {
        this.deck.reset();
      }
      
      return result;
    }
  
    simulateSession(numHands = 100) {
      for (let i = 0; i < numHands; i++) {
        this.simulateHand();
      }
      return this.getStatistics();
    }
  
    getStatistics() {
      const stats = {
          totalHands: this.history.length,
          winningHands: this.history.filter(h => h.win).length,
          totalProfit: this.history.reduce((sum, h) => sum + h.amount, 0),
          avgTrueCount: this.history.reduce((sum, h) => sum + parseFloat(h.trueCount), 0) / this.history.length,
          maxBet: Math.max(...this.history.map(h => h.bet)),
          winRateByCount: {},
          handsByCount: {}
      };
      
      const countRanges = this.history.reduce((acc, hand) => {
          const countRange = Math.floor(parseFloat(hand.trueCount));
          if (!acc[countRange]) acc[countRange] = { wins: 0, total: 0 };
          acc[countRange].total++;
          if (hand.win) acc[countRange].wins++;
          return acc;
      }, {});
      
      for (const [range, data] of Object.entries(countRanges)) {
          stats.winRateByCount[range] = (data.wins / data.total * 100).toFixed(1);
          stats.handsByCount[range] = data.total;
      }
      
      return stats;
    }
  }