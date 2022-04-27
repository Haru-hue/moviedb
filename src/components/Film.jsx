import React, { useState } from "react"
import StarIcon from '@mui/icons-material/Star';

function Film (props) {
    const [results, setResults] = useState({
        image: '',
        title: '',
        rating: '',
        plot: '',
        time: '',
        genres: '',
    })

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
      getFilmData()
    
    return (
        <section className="section film is-flex">
            <div className="image is-flex">
               {results.image !== null && <img src={results.image} alt={results.title}/>}
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
                <h3>{results.time}</h3>
                <h3>{results.genres}</h3>
            </div>
            {results.plot}
           </div>
        </section>
    )
}

export default Film