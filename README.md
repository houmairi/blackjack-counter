# Blackjack Card Counting Simulator

A sophisticated Blackjack simulation tool built with React that demonstrates the effectiveness of card counting strategies through statistical analysis and visualization.

## Features

- Real-time Blackjack simulation with Hi-Lo card counting system
- Configurable simulation parameters (decks, penetration, bet sizing)
- Interactive data visualization using Recharts
- Bankroll tracking and win rate analysis by count
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- Vite 6
- Recharts for data visualization
- TailwindCSS for styling
- ShadCN UI for component library
- ESLint for code quality

## Getting Started

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
  components/
    BlackjackViz.jsx      # Main visualization component
    simulation-controls.jsx # Simulation parameter controls
    game.js               # Core game logic and card counting
```

## Core Classes

### Card
- Represents a playing card with rank and suit
- Calculates card values and count values for Hi-Lo system
- Count values: +1 (2-6), 0 (7-9), -1 (10-A)

### Deck
- Manages multiple decks of cards
- Handles shuffling and card drawing
- Calculates running count and true count

### Game
- Implements game logic and betting strategy
- Simulates hands based on configurable parameters
- Tracks statistics and historical data

## Configuration Options

- Number of Decks (1-8)
- Starting Bankroll
- Base Betting Unit
- Maximum Bet Percentage
- Deck Penetration
- Number of Hands to Simulate

## Betting Strategy

The simulator uses a conservative betting strategy based on the true count:
- Minimum bet when true count ≤ 1
- Bet size increases linearly with true count
- Maximum bet capped at configured percentage of bankroll

## Win Rate Calculation

Win rates are dynamically adjusted based on:
- Base win rate of 48.5%
- True count influence
- Dealer upcard effects
- Maximum win rate capped at 65%

## Performance Considerations

- Asynchronous simulation execution
- Efficient data structure usage
- Optimized rendering with React hooks
- Memory-efficient history tracking

## Development

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Best Practices Implemented

1. Clean Code:
   - SOLID principles in class design
   - Single responsibility for components
   - Clear separation of concerns

2. Error Handling:
   - Input validation for simulation parameters
   - Graceful error handling in simulations
   - Clear error messaging

3. Performance:
   - Efficient card counting algorithms
   - Optimized React component rendering
   - Asynchronous simulation processing

4. Maintainability:
   - Consistent code style with ESLint
   - Modular component architecture
   - Clear documentation and comments