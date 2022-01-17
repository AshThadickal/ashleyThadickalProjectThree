import axios from 'axios';
import { useState } from 'react'
import './App.css';
import DisplayResults from './DisplayResults.js';


function App() {
  const [nasaItem, setNasaItem] = useState([])
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    axios({
      url: 'https://images-api.nasa.gov/search',
      method: 'GET',
      dataResponse: 'json',
      params: {
        q: searchTerm,
        media_type: 'image'
      },
    }).then((response) => {
      const shorterResponse = (response.data.collection.items).slice(0, 9)
      setNasaItem(shorterResponse);
    })

  }



  return (
    <div className="App">
      <h1 id='home'>A look at Space: <span>Images from NASA</span></h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for Space:</label>
        <input type="text" id="search" onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form>

      {
        nasaItem.map((nasaObject) => {
          return(
            <DisplayResults 
              key={nasaObject.data[0].nasa_id}
              href={nasaObject.links[0].href}
              title={nasaObject.data[0].title}
              description={nasaObject.data[0].description}
              />
          )
        })
      }
    </div>
  );
}

export default App;
