import { useEffect, useRef, useState } from 'react';
import './Header.css'

import UrlBack from '../../api/api.js'
import { getSearchMovies } from '../../api/getSearchMovies.js';

export default function Header(props) {
    const token = localStorage.getItem('Token')
    const searchList = useRef()
    const sideMenu = useRef()
    const logo = useRef()
    const searchBar = useRef()
    const searchInput = useRef()
    const userAccountOptions = useRef()
    const [backdrop, setBackdrop] = useState(false)

    const [findMovies, setFindMovies] = useState(null)
    const [showUserAccountOption, setShowUserAccountOption] = useState(false)


    async function searchMovies(e) {
        if (e.target.value.trim() === '') {
            setFindMovies(null)
            return
        }
        const response = await getSearchMovies(e.target.value)
        if (!response) {
            setFindMovies(null)
        } else if (response.status >= 500 || response.status === 0) {
            console.log('Erro de rede. Tente novamente.');
        } else if (response.status >= 300) {
            console.log(response.data);
            console.log('not found?');
        } else {
            setFindMovies(response.results)
        }
    }

    function movieFilm(params) {
        location.href = `/movie?id=${params}`
    }

    function showMenu() {
        if (sideMenu.current.style.left === '0px') {
            sideMenu.current.style.left = '-100%'
            setBackdrop(false)
            setTimeout(() => {
                sideMenu.current.style.display = 'none'
            }, 400)
        } else {
            sideMenu.current.style.display = ''
            setBackdrop(true)
            setTimeout(() => {
                sideMenu.current.style.left = '0'
            }, 0)
        }
    }

    function logout() {
        const url = location.href
        localStorage.clear()
        location.href = url
    }

    function showUserAccount() {
        if (showUserAccountOption) {
            setShowUserAccountOption(false)
        } else {
            setShowUserAccountOption(true)
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
            setFindMovies(null)

        }, 0);
    }

    return (
        <header>
            <div className="menu" onClick={showMenu}>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <aside className="sideMenu" ref={sideMenu}>
                    <nav>
                        <h3>Filmes</h3>
                        <a href='/'>Início</a>
                        <a href='/movies?list=popular'>Populares</a>
                        <a href='/movies?list=top_rated'>Melhores Filmes</a>
                        <h3>Categorias</h3>
                        <a href='/movies?category=28'>Ação</a>
                        <a href='/movies?category=16'>Animação</a>
                        <a href='/movies?category=35'>Comédia</a>
                        <a href='/movies?category=18'>Drama</a>
                        <a href='/movies?category=878'>Ficção</a>
                        <a href='/movies?category=10752'>Guerra</a>
                        <a href='/movies?category=27'>Terror</a>
                    </nav>
                </aside>
            </div>
            <div className='logo' ref={logo} onClick={() => location.href = '/'}><img src='https://fontmeme.com/permalink/240429/d77e0c85700fb42079d0035f0ca94a4f.png' alt='MovieFilm' /></div>
            <div className="searchBar" ref={searchBar} onClick={showInput} >
                <i className="fa-solid fa-magnifying-glass"  ></i>
                <input type='text' placeholder='Pesquisar Filme' ref={searchInput} onChange={(e) => searchMovies(e)} onBlur={hiddenInput} />
                {findMovies &&
                    <div className='listSearchMovies'>
                        {findMovies.map(element => (
                            <div className='cardMovieSearch' key={element.id} onClick={() => movieFilm(element.id)} tabIndex="0">
                                <img src={'https://image.tmdb.org/t/p/w200/' + element.poster_path} alt={element.title} />
                                <h3>{element.title}</h3>
                            </div>
                        ))
                        }
                    </div>
                }
            </div>
            <div className='userAccount' onClick={showUserAccount}>
                <div className='userAccountIcon'>
                    <span>{props.user ? props.user.name.slice(0, 1).toUpperCase() : <i className='fa-solid fa-user'></i>}</span>
                </div>
                {props.user && showUserAccountOption &&
                    <>
                        <nav className='userAccountOptions' ref={userAccountOptions}>
                            <a href='/perfil'><i className='fa-solid fa-user'></i>Perfil</a>
                            <a href='/favorites'><i className='fa-regular fa-heart'></i>Favoritos</a>
                            <a href='/watch'><i className='fa-regular fa-eye'></i>Assistir Depois</a>
                            <a id='userAccountOptionsBtnLogout' onClick={logout}><i className='fa-solid fa-arrow-right-from-bracket'></i>Logout</a>
                            <span></span>
                        </nav>
                    </>
                }
                {!props.user && showUserAccountOption &&
                    <>
                        <div className='userAccountOptions' ref={userAccountOptions}>
                            <a href='/login' onClick={sessionStorage.setItem('BackUrlPage', window.location.href)}>Fazer Login <i className='fa-solid fa-arrow-right-to-bracket'></i></a>
                            <span></span>
                        </div>
                    </>
                }
            </div>
            {backdrop && <div className="backdrop" onClick={() => showMenu()}></div>}


        </header>
    )
}