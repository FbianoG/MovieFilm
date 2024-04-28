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
    const userAccountOptions = useRef()

    const [searchMovies, setSearchMovies] = useState(false)


    async function searchMovie() { // ! criar arquivo para separar function
        if (searchInput.current.value.trim() === '') {
            searchList.current.style.display = ''
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
        searchList.current.style.display = 'flex'
    }

    function movieFilm(params) {
        location.href = `/movie?id=${params}`
    }

    function showMenu() {
        if (sideMenu.current.style.left === '0px') {
            sideMenu.current.style.left = '-100%'
            setTimeout(() => {
                sideMenu.current.style.display = 'none'
            }, 400)
        } else {
            sideMenu.current.style.display = ''
            setTimeout(() => {
                sideMenu.current.style.left = '0'
            }, 0)
        }
    }

    function hiddenMenu() {
        // sideMenu.current.style.left = '-100%'
        // console.log('11');
        setTimeout(() => {
            // sideMenu.current.style.display = 'none'
        }, 400)
    }

    function logout() {
        const url = location.href
        localStorage.clear()
        location.href = url
    }

    function showUserAccount() {
        if (userAccountOptions.current.style.display === 'none' || userAccountOptions.current.style.display === '') {
            userAccountOptions.current.style.display = 'flex'
        } else {
            userAccountOptions.current.style.display = 'none'
        }
    }

    function showInput() {
        if (window.innerWidth > 767) {
            return
        }
        logo.current.style.display = "none"
        searchInput.current.style.width = "100%"
        searchBar.current.style.width = "100%"
        searchInput.current.style.display = "block"
        searchInput.current.focus()
        if (searchInput.current.value.trim() !== '') {
            searchList.current.style.display = "flex"
        }
    }

    function hiddenInput() {
        if (window.innerWidth > 767) {
            return
        }
        logo.current.style.display = "block"
        searchBar.current.style.width = ""
        searchInput.current.style.width = ""
        searchInput.current.style.display = "none"
        setTimeout(() => { // usado para garantir que "movieFilm" seja executada antes de fechar a lista
            searchList.current.style.display = "none"
        }, 0);
    }

    return (
        <header>
            <div className="menu" onClick={showMenu} onBlur={hiddenMenu}>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <aside className="sideMenu" ref={sideMenu}>
                    <nav>
                        <h3>Filmes</h3>
                        <a href='/'>Início</a>
                        <a href='/movies?category=popular'>Populares</a>
                        <a href='/movies?category=top_rated'>Melhores Filmes</a>
                        <a href=''>Mais Votados</a>
                    </nav>
                </aside>
            </div>

            <div className='logo' ref={logo}>MovieFilm</div>

            <div className="searchBar" ref={searchBar} onClick={showInput}  >
                <i className="fa-solid fa-magnifying-glass"  ></i>
                <input type='text' name='' placeholder='Pesquisar' onChange={searchMovie} ref={searchInput} onBlur={hiddenInput} />
                <div className='listSearchMovies' ref={searchList}>
                    {searchMovies && searchMovies.results.map(element => (
                        <div className='cardMovieSearch' key={element.id} onClick={() => movieFilm(element.id)} tabIndex="0">
                            <img src={'https://image.tmdb.org/t/p/w200/' + element.poster_path} alt={element.title} />
                            <h3>{element.title}</h3>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className='userAccount' onClick={showUserAccount}>
                {props.user &&
                    <>
                        <div className='userAccountIcon'>
                            <span>{props.user.name.slice(0, 1).toUpperCase()}</span>
                        </div>
                        <nav className='userAccountOptions' ref={userAccountOptions}>
                            <a href='/perfil'><i className='fa-solid fa-user'></i>Perfil</a>
                            <a href='/favorites'><i className='fa-regular fa-heart'></i>Favoritos</a>
                            <a href='/watch'><i className='fa-regular fa-eye'></i>Assistir Depois</a>
                            <a id='userAccountOptionsBtnLogout' onClick={logout}><i className='fa-solid fa-arrow-right-from-bracket'></i>Logout</a>
                            <span></span>
                        </nav>
                    </>
                }
                {!props.user &&
                    <>
                        <div className='userAccountIcon'>
                            <i className='fa-solid fa-user'></i>
                        </div>
                        <div className='userAccountOptions' ref={userAccountOptions}>
                            <a href='/login' onClick={sessionStorage.setItem('BackUrlPage', window.location.href)}>Fazer Login <i className='fa-solid fa-arrow-right-to-bracket'></i></a>
                            <span></span>

                        </div>
                    </>
                }
            </div>

        </header>
    )
}