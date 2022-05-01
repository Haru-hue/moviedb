import { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import "./scss/App.scss"
import Film from './components/Film';
import Header from './components/Header';
import Body from './components/Body';

function App() {
    const [movieData, setMovieData] = useState([])
    const [totalResults, setTotalResults] = useState("")
    const [watchList, setWatchlist] = useState(0)
    const [addFilm, setAddFilm] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [isClicked, setisClicked] = useState(false)
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
          setTotalResults(data.totalResults)
        }
    }

    useEffect(() => {
      getMovies()
    })

    const movies = movieData?.map(item => {
      return <Film key={item.imdbID} id={item.imdbID} 
      darkMode={darkMode} addFilm={addFilm} toggleFilm={toggleFilm}/>
    })

    function toggleFilm (id) {
      setAddFilm(prev => !prev)
      setWatchlist(addFilm ? watchList+1 : watchList-1)
    }

    function toggleClick () {
      setisClicked(prev => !prev)
    }

    function toggleDarkMode () {
      setDarkMode(prev => !prev)
    }

    useEffect(() => {
      if(darkMode) {
        document.documentElement.classList.add("dark")
      }
      return () => {
        document.documentElement.classList.remove("dark")
      }
    }, [darkMode])

    return (
      <>
        <Header handleSearch={handleSearch} toggleClick={toggleClick} 
        toggleDarkMode={toggleDarkMode} isClicked={isClicked} 
        darkMode={darkMode} watchList={watchList}/>
        <div className={`film-container ${darkMode ? "dark" : ""}`}>
          {movies}
          <Body isClicked={isClicked} searchResults={searchResults} totalResults={totalResults}/>
        </div>
      </>
    )
}

export default App;
