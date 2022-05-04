import TheatersIcon from '@mui/icons-material/Theaters';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Body (props) {
    const {searchResults, totalResults, isClicked, watchlist} = props

    const displayText = searchResults.length === 0 ? (<><TheatersIcon/><h3>Start exploring</h3></>) : 
    totalResults === undefined ? 
    (<h3 className="search-text">Unable to find what you’re looking for. Please try another search.</h3>) 
    : ""


    return (
        <section className={`section container-fluid is-flex movie-body`}>
            <div className="icon-body has-text-centered">
                {isClicked ? (watchlist === 0 ? <><h3>Your watchlist is looking a little empty...</h3>
                <span><AddCircleIcon/> Let's add some movies!</span></> : "") : displayText}
            </div>
        </section>
    )
}