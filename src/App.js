import axios from 'axios';
import { useState } from 'react'
import './App.css';
import DisplayResults from './DisplayResults.js';
import Popup from './Popup.js';


function App() {
  const [nasaItem, setNasaItem] = useState([])
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [liked, setLiked] = useState([]);
  const [popup, setPopup] = useState(false);

  const handleInput = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput('')

    axios({
      url: 'https://images-api.nasa.gov/search',
      method: 'GET',
      dataResponse: 'json',
      params: {
        q: userInput,
        media_type: 'image'
      },
    }).then((response) => {
      const shorterResponse = (response.data.collection.items).slice(0, 9)
      shorterResponse.length === 0 ? setPopup(true) : setNasaItem(shorterResponse);
    })

  }

  const handleLike = (event) => {
    event.preventDefault()
    const likedArray = [];
    likedArray.push(event.target.value)
    setLiked(likedArray)
    console.log(liked)
    // if(liked.includes(event.target.value)) {

    // }
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
              handleLike={handleLike}
              />
          )
        })
      }

      <button><a href="#home">Click to Search Again</a></button>

      <Popup
        trigger={popup}
        setTrigger={setPopup}>
        <p>Please check the spelling of your search or try Moon, Stars, Earth, or Jupiter!</p>
      </Popup>
    </div>
  );
}

export default App;
