import { useEffect, useState } from 'react'
import axios from 'axios';
import DisplayResults from './DisplayResults.js';
import InputForm from './InputForm.js';
import Popup from './Popup.js';
import SearchAgainButton from './SearchAgainButton'

// import './App.css';

function App() {
  const [nasaItem, setNasaItem] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [popup, setPopup] = useState(false);
  const [searchAgain, setSearchAgain] = useState(false);
  
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
    setUserInput(''); 
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
      const shorterResponse = (response.data.collection.items).slice(0, 9)
            
      const createLikes = (nasaItem) => {
        const responseWithLikes = [...nasaItem];
        responseWithLikes.forEach(item => {
          item.likes = false
        });
        
        setNasaItem(responseWithLikes)
      }
        shorterResponse.length === 0 ? setPopup(true) : createLikes(shorterResponse);
    })
    }
  }, [searchTerm])

  return (
    <div className='mainContainer'>
      <header>
        <div className='wrapper headerContainer'>
          <h1 id='home'>A look at Space: <span>Images from NASA</span></h1>
          <p>We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win.</p>
        </div>
      </header>
      <InputForm 
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        userInput={userInput}
        setSearchAgain={setSearchAgain}
      />

    <section className='wrapper resultsContainer'>
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

      <SearchAgainButton 
        searchAgain={searchAgain}
        setSearchAgain={setSearchAgain}
        />
    </section>

    <footer>
      <p>Created at <a href='htts://www.junocollege.com'>Juno College</a> by Ashley Thadickal</p>
    </footer>

      <Popup
        trigger={popup}
        setTrigger={setPopup}>
        <p>Please check the spelling of your search or try Moon, Stars, Earth, or Jupiter!</p>
      </Popup>
    </div>
  );
}

export default App;
