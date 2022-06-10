import { useEffect, useState, useRef } from 'react';
import 'bulma/css/bulma.min.css';
import "./scss/App.scss"
import Film from './components/Film';
import Header from './components/Header';
import Body from './components/Body';
import env from 'react-dotenv'

const useLocalStorage = (key, initialValue)  => {
    const [storeValue, setStoreValue] = useState(() => {
      const item = localStorage.getItem(key)
      if(item) {
        return JSON.parse(item)
      }
      return typeof initialValue === 'string' ? initialValue() : initialValue
    })
    const keyRef = useRef(key)

    useEffect(() => {
      const prevKey = keyRef.current

      if(prevKey !== key) {
        localStorage.removeItem(prevKey)
      }
      keyRef.current = key //
      localStorage.setItem(key, JSON.stringify(storeValue))

    },[key, storeValue])

    return [storeValue, setStoreValue]
}

function App() {
    const [movieData, setMovieData] = useState([])
    const [totalResults, setTotalResults] = useState("")
    const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])
    const [darkMode, setDarkMode] = useState(false)
    const [isClicked, setisClicked] = useState(false)
    const [searchResults, setSearchResults] = useState("")

    let handleSearch = (event) => {
        var lower = event.target.value.toLowerCase()
        setSearchResults(lower)
    }

    useEffect(() => {
      async function getMovies() {
        if (searchResults !== undefined) { 
          const res = await fetch(
            `https://www.omdbapi.com/?s=${searchResults}&type=movie&page=1&apikey=${env.REACT_APP_API_KEY}`
          );
          const data = await res.json();
          setMovieData(data["Search"]?.map(item => item.imdbID));
          setTotalResults(data["totalResults"])
        }
      }
  
      getMovies();
    }, [searchResults]);

    const movies = (isClicked ? watchlist : movieData)?.map(item => {
      return <Film key={item} id={item} 
      darkMode={darkMode} watchlist={watchlist} 
      setWatchlist={setWatchlist}/>
    })

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
        darkMode={darkMode} watchlist={watchlist}/>
        <div className={`film-container ${darkMode ? "dark" : ""}`}>
          {movies}
          <Body isClicked={isClicked} searchResults={searchResults} 
          totalResults={totalResults} watchlist={watchlist.length}/>
        </div>
      </>
    )
}

export default App;
