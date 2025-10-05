import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([]); // empty array to save card images
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // API call to get 12 pokemon
  async function fetchPokemon() { // creating async function
    const promises = []; // storage for each api return

    // loop to generate 12 calls
    for (let i = 1; i <= 12; i++){
      const randNum = Math.floor(Math.random() * (151 - 1 + 1)) + 1; // generates a random number for each loop
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${randNum}`).then((res) => // uses random number to populate pokemon info
          res.json()
        )
      );  
    }

    // reset card array
    setCards([]);

    // waiting for the loop to finish and storing the results
    const results = await Promise.all(promises);

    // iterate through results to store id, name, and image for each pokemon
    const newCards = results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }));

    setCards(newCards); // adding each card to the "cards" useState
  }

  useEffect(() => {
    fetchPokemon(); // calling function to populate 12 random pokemon
  }, [refresh]);


  // onClick Scoring handler function
  function handleCardClick(id) {
    // check to see if card has already been clicked
    if (clickedCards.includes(id)) {
      // reset score and game
      setScore(0);
      setClickedCards([]);
    } else {
      // update score
      const newScore = score + 1;
      setScore(newScore);

      // add to array of clicked cards
      setClickedCards([...clickedCards, id]);

      // Check to see if it's a new best score
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    setRefresh(prev => !prev);
  }

  return (
    <div className='game-container'>
      <h1>Memory Card Game</h1>
      <div className='scoreboard'>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div className='card-grid'>
        {cards.map((card) => (
          <div key={card.id} className='card' onClick={() => handleCardClick(card.id)}>
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
