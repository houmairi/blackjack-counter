# Blackjack Simulation Parameters Explained

## Number of Decks (Default: 6)
- **What it is**: How many decks of cards are used in the shoe (the dealing device)
- **Why it matters**: More decks make counting harder because each card has less impact on the overall count
- **Typical range**: Most casinos use 6-8 decks, though some use fewer
- **Strategy tip**: Fewer decks slightly increase the player's advantage when counting

## Number of Hands (Default: 1000)
- **What it is**: How many rounds of blackjack the simulation will play
- **Why it matters**: More hands give you a better picture of long-term results
- **Strategy tip**: Use at least 1000 hands to get meaningful results, as short-term results can be misleading

## Starting Bankroll (Default: €10,000)
- **What it is**: How much money you start with
- **Why it matters**: Your bankroll needs to be large enough to handle losing streaks and bet spreads
- **Strategy tip**: A common recommendation is having at least 100 times your base betting unit

## Base Betting Unit (Default: €100)
- **What it is**: Your minimum bet size when the count isn't in your favor
- **Why it matters**: This is what you'll bet when the true count is 1 or less
- **Strategy tip**: Should be small enough that you can weather losing streaks but large enough to make winning meaningful

## Max Bet Percentage (Default: 5%)
- **What it is**: Maximum bet size as a percentage of your total bankroll
- **Why it matters**: Protects you from betting too much on a single hand, even with a high count
- **Strategy tip**: Staying under 5% helps protect your bankroll from depletion during losing streaks

## Deck Penetration (Default: 75%)
- **What it is**: How deep into the deck(s) the dealer deals before shuffling
- **Why it matters**: Deeper penetration gives you more information and betting opportunities
- **Example**: 75% means in a 6-deck game, about 4.5 decks will be dealt before shuffling
- **Strategy tip**: Higher penetration (>70%) is better for counting, but casinos often use lower penetration to combat counting

## Important Notes:
1. These parameters significantly affect your winning potential and risk level
2. Real casinos may have different rules and limitations
3. The simulation uses a basic Hi-Lo counting system (+1 for 2-6, -1 for 10-A, 0 for 7-9)
4. Your bet size increases with the true count, which is the running count divided by decks remaining