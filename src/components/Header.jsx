import { Search } from "@mui/icons-material"
import { Button } from "@mui/material";
import Badge from '@mui/material/Badge';

export default function Header (props) {
    return (
        <header className="section header container-fluid is-flex">
			 <div className="toggler" >
                <p className={`toggler--${!props.darkMode ? "dark" : "light"}`}>Light</p>
                <div 
                    className={`toggler--slider ${props.darkMode ? "dark" : ""}`}
                    onClick={props.toggleDarkMode}>
                    <div className={`toggler--slider--circle ${props.darkMode ? "dark" : ""}`}></div>
                </div>
                <p className={`toggler--${props.darkMode ? "dark" : "light"}`}>Dark</p>
            </div>
           <div className="container has-text-centered">
                <div className="film-header is-flex">
					<h2 className="title has-text-white film-header">
                        {props.isClicked ? "My Watchlist" : "Find your film"}
                        </h2>               
                    <div className="film-sidetext">
                    <Badge color="secondary" badgeContent={props.watchlist.length}>
                        <Button
                            onClick={props.toggleClick}
                        >
                            {props.isClicked ? "Search for Movies" : "My Watchlist"}
                        </Button>
                    </Badge>
                     </div>
				</div>
            {props.isClicked ? "" : <div className={`search-container is-flex ${props.darkMode ? "dark" : ''}`} id="search-form">
                        <div className="icon-container is-flex">
                            <Search/>{' '}
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            name="search"
                            placeholder="Search for a movie..."
                            onChange={props.handleSearch}
                        />
                        <button className="search-btn">Search</button>
                </div>}
            </div>
        </header>
    )
}