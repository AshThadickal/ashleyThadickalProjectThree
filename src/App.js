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
  const [listOfLikes, setListOfLikes] = useState([]);
  
  const handleInput = (event) => {
    setUserInput(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
    setUserInput(''); 
  }

  // Function to be able to like and unlike a photo
  const handleLike = (id) => {
    const newNasaItem = [...nasaItem];
    // finding the index of the array item based of the id returned from the API
    const index = newNasaItem.findIndex(item => item.data[0].nasa_id === id);
    // switching the likes property between true and false
    newNasaItem[index].likes = !newNasaItem[index].likes;
    setNasaItem(newNasaItem);
    console.log(nasaItem);
    likedNasaItems();
  }

  const likedNasaItems = () => {
    const spreadNasaItem = [...nasaItem];
    const spreadLikedItems = [...listOfLikes]
    spreadNasaItem.forEach(spreadItem => {
      if(spreadItem.likes) {
        const newLikedImage = 
        {
          id: spreadItem.data[0].nasa_id,
          image: spreadItem.links[0].href,
          title: spreadItem.data[0].title,
        };
        spreadLikedItems.push(newLikedImage)
        setListOfLikes(spreadLikedItems)
      }
    })
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
      console.log(response)
      const shorterResponse = (response.data.collection.items).slice(0, 9)
      // Adding a 'likes' property to the returned object with a value of false
      const createLikes = (nasaItem) => {
        const responseWithLikes = [...nasaItem];
        responseWithLikes.forEach(item => {
          item.likes = false
        });
      setNasaItem(responseWithLikes)
      }
      // Error handling for if the response is an empty array (this was done before we learned about this in class and I didn't have an opportunity to get it working in the way we learned)
      shorterResponse.length === 0 ? setPopup(true) : createLikes(shorterResponse);
    }).catch((err) => {
      alert('There was an unexpected error in processing your request')
    })
    }
  }, [searchTerm]);
  // End of getting data from API and storing in the nasaItem
  
  console.log(nasaItem)

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
