import { useRef, useState } from 'react';
import './Header.css'

export default function Header(props) {
    const searchInput = useRef()
    const searchList = useRef()

    const [searchMovies, setSearchMovies] = useState(false)



    async function searchMovie() {
        if (searchInput.current.value.trim() === "") {
            searchList.current.style.display = ""
            return
        }
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.current.value}&language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setSearchMovies(data)
        searchList.current.style.display = "flex"
    }

    return (
        <header>
            <span>MovieFilm</span>
            <div className="searchBar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type='search' name='' placeholder='Pesquisar' onChange={searchMovie} ref={searchInput} />
                <div className="listSearchMovies" ref={searchList}>
                    {searchMovies &&
                        searchMovies.results.map(element => (
                            <div className="cardMovieSearch" key={element.id} >
                                <img src={"https://image.tmdb.org/t/p/w200/" + element.poster_path} alt={element.title} />
                                <h3>{element.title}</h3>
                            </div>
                        ))

                    }
                </div>
            </div>
            <nav>
                <a href='' target='_blank'>Home</a>
                <a href='' target='_blank'>About</a>
                <a href='' target='_blank'>More</a>
                <a href='' target='_blank'>Contact</a>
            </nav>
        </header>
    )
}