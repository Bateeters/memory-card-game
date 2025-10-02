import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([]); // empty array to save card images

  return (
    <div>
      <h1>Memory Card Game</h1>
      <div className='card-grid'>
        <p>Cards will populate here</p>
      </div>
    </div>
  )
}

export default App
