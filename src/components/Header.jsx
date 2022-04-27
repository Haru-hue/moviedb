import { Search } from "@mui/icons-material"

export default function Header ({handleSearch}) {
    return (
        <header className="section header container-fluid is-flex">
           <div className="container has-text-centered">
                <div className="film-header is-flex">
					<h2 className="title has-text-white film-header">Find your film</h2>
                	<p className="film-sidetext">My Watchlist</p>
				</div>
            <div className="search-container is-flex" id="search-form">
					<div className="icon-container is-flex">
						<Search/>{' '}
					</div>
					<input
						type="text"
						className="search-input"
						name="search"
						placeholder="Search for a movie..."
						onChange={handleSearch}
					/>
					<button className="search-btn">Search</button>
				</div>
            </div>
        </header>
    )
}