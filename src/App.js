import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './components/Header.js'
import DisplayResults from './components/DisplayResults.js';
import InputForm from './components/InputForm.js';
import SearchAgainButton from './components/SearchAgainButton'
import Footer from './components/Footer.js';
import Popup from './components/Popup.js';

function App() {
  const [nasaItem, setNasaItem] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [popup, setPopup] = useState(false);
  const [searchAgain, setSearchAgain] = useState(false);
  
  const handleInput = (event) => {
    setUserInput(event.target.value);
  };
  
  const handleLike = (id) => {
    const newNasaItem = [...nasaItem];
    const index = newNasaItem.findIndex(item => item.data[0].nasa_id === id);
    newNasaItem[index].likes = !newNasaItem[index].likes;
    setNasaItem(newNasaItem);
    console.log('nasaItem', nasaItem);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput(''); 
  }
  // End of Handle Functions

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
    }).catch(err => (console.log(err)));
    }
  }, [searchTerm]);
  // End of getting data from API and storing in the nasaItem
  

  return (
    <div className='mainContainer'>

      <Header />

      <InputForm 
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        userInput={userInput}
        setSearchAgain={setSearchAgain}
      />

    <main className='wrapper resultsContainer'>
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
      {/* End of Displayed Data */}

      <SearchAgainButton 
        searchAgain={searchAgain}
        setSearchAgain={setSearchAgain}
        />
    </main>

      <Footer />

      <Popup
        trigger={popup}
        setTrigger={setPopup}>
        <p>Please check the spelling of your search or try Moon, Stars, Earth, or Jupiter!</p>
      </Popup>
    </div>
  );
}

export default App;
