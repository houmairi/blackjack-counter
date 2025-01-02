import BlackjackViz from './components/BlackjackViz'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Blackjack Card Counting Simulation</h1>
        <BlackjackViz />
      </div>
    </div>
  )
}

export default App