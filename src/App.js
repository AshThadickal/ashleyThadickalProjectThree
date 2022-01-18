import { useEffect, useState } from 'react'
import axios from 'axios';
import DisplayResults from './DisplayResults.js';
import InputForm from './InputForm.js';
import Popup from './Popup.js';
import './App.css';


function App() {
  const [nasaItem, setNasaItem] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [popup, setPopup] = useState(false);
  
  const handleInput = (event) => {
    setUserInput(event.target.value)
  }
  
  const handleLike = (id) => {
    const newNasaItem = [...nasaItem];
    const index = newNasaItem.findIndex(item => item.data[0].nasa_id === id);
    newNasaItem[index].likes = !newNasaItem[index].likes
    setNasaItem(newNasaItem);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput('')
  }

  useEffect (() => {
    if (searchTerm !== '') {
    axios({
      url: 'https://images-api.nasa.gov/search',
      method: 'GET',
      dataResponse: 'json',
      params: {
        q: searchTerm,
        media_type: 'image'
      },
    }).then((response) => {
      const shorterResponse = (response.data.collection.items).slice(0, 8)
      
      
      const createLikes = (nasaItem) => {
        const responseWithLikes = [...nasaItem];
        responseWithLikes.forEach(item => {
          item.likes = false
        });
        
        setNasaItem(responseWithLikes)
      }
        
        shorterResponse.length === 0 ? setPopup(true) : createLikes(shorterResponse);;
        // setNasaItem(responseWithLikes);
    })
    }
  }, [searchTerm])

  


  return (
    <div className="App">
      <header>
        <h1 className='wrapper' id='home'>A look at Space: <span>Images from NASA</span></h1>
      </header>
      <InputForm 
        handleSubmit={handleSubmit}
        handleInput={handleInput}
      />

      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for Space:</label>
        <input type="text" id="search" onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form> */}
<div className='resultsContainer'>
      {
        nasaItem.map((nasaObject) => {
          return(
            
              <DisplayResults 
                key={nasaObject.data[0].nasa_id}
                id={nasaObject.data[0].nasa_id}
                href={nasaObject.links[0].href}
                title={nasaObject.data[0].title}
                description={nasaObject.data[0].description}
                activeLike={nasaObject.likes}
                handleLike={handleLike}
                />
            
          )
        })
      }
</div>
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
