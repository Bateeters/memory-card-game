import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([]); // empty array to save card images

  useEffect(() => {
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

      // storing all the api info in "results"
      const results = await Promise.all(promises);

      // iterate through results to store id, name, and image for each pokemon
      const newCards = results.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      }));

      setCards(newCards); // adding each card to the "cards" useState
    }

    fetchPokemon(); // calling function to populate 12 random pokemon
  }, []);

  return (
    <div>
      <h1>Memory Card Game</h1>
      <div className='card-grid'>
        {cards.map((card) => (
          <div key={card.id} className='card' style={{border: "1px solid white"}}>
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
