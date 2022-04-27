import { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import "./scss/App.scss"
import Film from './components/Film';
import Header from './components/Header';
import Body from './components/Body';

function App() {
    const [movieData, setMovieData] = useState([])
    const [searchResults, setSearchResults] = useState("")

    let handleSearch = (event) => {
        var lower = event.target.value.toLowerCase()
        setSearchResults(lower)
    }

    async function getMovies () {
        if(searchResults !== undefined) {
          const res = await fetch(`https://www.omdbapi.com/?s=${searchResults}&type=movie&page=1&apikey=4c541d31`)
          const data = await res.json()
          setMovieData(data["Search"])
        }
    }

    useEffect(() => {
      getMovies()
    }, [])

    console.log(searchResults)
    console.log(movieData)
    return (
      <>
        <Header handleSearch={handleSearch}/>
        <Body/>
      </>
    )
}

export default App;
