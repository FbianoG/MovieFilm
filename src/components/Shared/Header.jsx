import { useEffect, useRef, useState } from 'react';
import './Header.css'
import UrlBack from '../../api/api.js'


export default function Header(props) {
    const token = localStorage.getItem('Token')
    const searchInput = useRef()
    const searchList = useRef()
    const sideMenu = useRef()
    const logo = useRef()
    const searchBar = useRef()

    const [searchMovies, setSearchMovies] = useState(false)

    async function searchMovie() { // ! criar arquivo para separar function
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

    function movieFilm(params) {
        location.href = `/movie?id=${params}`
    }

    function showMenu() {

        if (sideMenu.current.style.left === '0px') {
            sideMenu.current.style.left = '-100%'
            setTimeout(() => {
                sideMenu.current.style.display = 'none'
            }, 400);

        } else {
            sideMenu.current.style.display = ''
            setTimeout(() => {
                sideMenu.current.style.left = '0'
            }, 0);
        }
    }

    function showInput() {
        if (window.innerWidth > 767) {
            return
        }
        logo.current.style.display = "none"
        searchInput.current.style.width = "200px"
        searchInput.current.style.display = "block"
        // searchBar.current.style.display = "none"
    }

    function hiddenInput() {
        if (window.innerWidth > 767) {
            return
        }
        logo.current.style.display = "block"
        searchInput.current.style.width = ""
        searchInput.current.style.display = "none"
    }

    function setLogin() {
        sessionStorage.setItem('BackUrlPage', window.location.href)
        location.href = '/login'
    }


    return (
        <header>
            <div className="menu" onClick={showMenu}>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className="sideMenu" ref={sideMenu}>
                    <nav>
                        {props.user && <div className='miniPerfil'>
                            <span>{props.user.name.slice(0, 1)}</span>
                            <p>{props.user.name.split(' ').slice(0, 2).join(' ')}</p>
                        </div>}
                        {!props.user && <button id='btnLogin' onClick={setLogin} >Login</button>}
                        {props.user &&
                            <>
                                <a href='/perfil'>Perfil</a>
                                
                                <a href='/favorites'>Favoritos</a>
                                <a href='/watch'>Assistir Depois</a>
                            </>
                        }
                        <h3>Filmes</h3>
                        <a href='/'>Início</a>
                        <a href='/movies?category=popular'>Populares</a>
                        <a href='/movies?category=top_rated'>Melhores Filmes</a>
                        <a href=''>Mais Votados</a>
                    </nav>
                </div>
            </div>
            <div className='logo' ref={logo}>MovieFilm</div>
            <div className="searchBar" ref={searchBar}>
                <i className="fa-solid fa-magnifying-glass" onClick={showInput} ></i>
                <input type='search' name='' placeholder='Pesquisar' onChange={searchMovie} onBlur={hiddenInput} ref={searchInput} />
                <div className="listSearchMovies" ref={searchList}>
                    {searchMovies && searchMovies.results.map(element => (
                        <div className="cardMovieSearch" key={element.id} onClick={() => movieFilm(element.id)} >
                            <img src={"https://image.tmdb.org/t/p/w200/" + element.poster_path} alt={element.title} />
                            <h3>{element.title}</h3>
                        </div>
                    ))
                    }
                </div>
            </div>
        </header>
    )
}