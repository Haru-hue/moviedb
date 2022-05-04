import React, { useState, useEffect} from "react"
import StarIcon from '@mui/icons-material/Star';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button } from "@mui/material";

function Film (props) {
    const isFavorite = props.watchlist.includes(props.id)
    function handleClick () {
        if(isFavorite) {
            return props.setWatchlist(prev => prev.filter(p => p !== props.id))
        }
        props.setWatchlist(prev => [...prev, props.id])
    }

    const [results, setResults] = useState({
        image: '',
        title: '',
        rating: '',
        plot: '',
        time: '',
        genres: '',
    })
 
    useEffect(() => {
        async function getFilmData () {
            const res = await fetch(`https://www.omdbapi.com/?i=${props.id}&apikey=4c541d31`)
            const data = await res.json()
            setResults({
              image: data.Poster,
              title: data.Title,
              rating: data.imdbRating,
              plot: data.Plot,
              time: data.Runtime,
              genres: data.Genre,
            })
      }
        getFilmData() }, [props.id])
    
    return (
        <section className="section film is-flex">
            <div className="image is-flex">
               {results.image !== 'N/A' && <img src={results.image} alt={results.title}/>}
            </div>
           <div className="film-section is-flex">
            <div className="movie-header is-flex">
                <h4>{results.title}</h4>
                <p className="rating">
                    <StarIcon/>
                    {results.rating}
                </p>
            </div>
            <div className="desc is-flex">
                <span><h3>{results.time}</h3></span>
                <span><h3>{results.genres}</h3></span>
                <span><Button className="watchlist-btn"
				startIcon={isFavorite ? <RemoveCircleIcon/> : <AddCircleIcon/>}
                onClick={handleClick}>
						{isFavorite ? "Remove" : "Watchlist"}
				</Button></span>
            </div>
            {results.plot}
           </div>
        </section>
    )
}

export default Film