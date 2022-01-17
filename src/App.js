import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css';
import DisplayResults from './DisplayResults.js';

function App() {
  const [nasaItem, setNasaItem] = useState([])

  useEffect(() => {
    axios({
      url: 'https://images-api.nasa.gov/search',
      method: 'GET',
      dataResponse: 'json',
      params: {
        q: 'moon',
        media_type: 'image'
      },
    }).then((response) => {
      // *********************** is the below the proper way to return a shorter response if the API does not provide for an option to limit the response? Is this the proper way to handle this 'error in spelling?'
      const shorterResponse = (response.data.collection.items).slice(0, 9)
      setNasaItem(shorterResponse);
    })
  }, [])
  console.log(nasaItem)

  return (
    <div className="App">
      <h1 id='home'>A look at Space: <span>Images from NASA</span></h1>

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
