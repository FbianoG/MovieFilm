import { useEffect, useState } from 'react'
import './Movie.css'

import Header from '../components/Shared/Header'
import Footer from '../components/Shared/Footer'

import includeFavorite from '../api/includeFavorite'
import includeWatch from '../api/includeWatch'
import CardMovie from '../components/Layout/CardMovie'
import CardComments from '../components/Layout/CardComments'

export default function Movie(props) {

    const movieId = new URLSearchParams(window.location.search).get("id")
    const [Movie, setMovie] = useState(false)
    const [Actor, setActor] = useState(false)
    const [Providers, setProviders] = useState(false)
    const [Similar, setSimilar] = useState(false)
    const [Comments, setComments] = useState(false)
    const [Video, setVideo] = useState(false)
    const [hiddenVideo, setHiddenVideo] = useState(true)
    const [urlVideo, setUrlVideo] = useState()

    async function getMovie() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setMovie(data)
        // console.log(data);
    }

    async function getActor() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setActor(data)
        // console.log(data);
    }

    async function getProviders() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setProviders(data.results.BR.rent)
    }

    async function getSimilar() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=pt-br`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        // console.log(data.results);
        setSimilar(data.results)
    }

    async function getComments() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=pt-br`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setComments(data.results)
    }

    async function getVideo() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setVideo(data.results)
    }

    async function addFavorite(e) {
        await includeFavorite(e)
        await props.bring()
    }
    async function addWatch(e) {
        await includeWatch(e)
        await props.bring()
    }

    function formatMoney(numero) {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return formatador.format(numero);
    }

    function showVideo(e) {
        if (typeof e === 'object') {

            if (e.target.className === 'containerVideo') {
                setHiddenVideo(true)
                return
            }
        }
        setHiddenVideo(false)
        setUrlVideo(e)
    }

    useEffect(() => {
        getMovie()
        getActor()
        getProviders()
        getSimilar()
        getComments()
        getVideo()
        props.bring()
    }, [])


    let sizeImage = 'original'
    if (window.innerWidth <= 500) {
        sizeImage = 'w500'
    }

    return (
        <>
            <Header user={props.user} />
            {Movie &&
                <div className='movieContainer'>

                    <img src={`https://image.tmdb.org/t/p/${sizeImage}/` + Movie.backdrop_path} alt={Movie.title} />
                    <div className="movieData">
                        <h1>{Movie.title}</h1>
                        <div className="movieInfo">
                            <span>{Movie.release_date.slice(0, 4)}</span>
                            <span>|</span>
                            <span>{Movie.runtime} min</span>
                            <span>|</span>
                            <span>{Movie.vote_average.toFixed(1)}</span>
                            <span>|</span>
                            <span>{Movie.genres[0].name}{Movie.genres[1] && " e " + Movie.genres[1].name}</span>
                        </div>

                        <p>{Movie.overview}</p>
                        <div className="btnControl">

                            {props.user && props.user.like.some(element => element.id == Movie.id) && <button onClick={() => addFavorite(Movie)}>Remover do Favoritos</button>}
                            {props.user && !props.user.like.some(element => element.id == Movie.id) && <button onClick={() => addFavorite(Movie)}>Adicionar ao Favoritos</button>}
                            {props.user && props.user.watch.some(element => element.id == Movie.id) && <button onClick={() => addWatch(Movie)}>Não quero assistir</button>}
                            {props.user && !props.user.watch.some(element => element.id == Movie.id) && <button onClick={() => addWatch(Movie)}>Assistir depois</button>}
                        </div>
                        {Movie.homepage && <a href={Movie.homepage} target='_blank'>{Movie.homepage}</a>}
                        <div className="movieCosts">
                            <p><i className="fa-regular fa-flag"></i>Origem:</p>
                            <span>{(Movie.origin_country[0])}</span>
                            <p><i className="fa-solid fa-wallet"></i>Orçamento:</p>
                            <span>{formatMoney(Movie.budget * 5.2)}</span>
                            <p><i className="fa-solid fa-chart-line"></i>Lucro:</p>
                            <span>{formatMoney(Movie.revenue * 5.2)}</span>
                        </div>
                        <div className="movieProduction">
                            {Providers && Providers.map(element => {
                                if (!element.logo_path) {
                                    return
                                }
                                return (
                                    <div className="cardMovieProduction" key={element.provider_name}>
                                        <img src={"https://image.tmdb.org/t/p/w200/" + element.logo_path} alt={element.provider_name} />
                                        {/* <span>{element.name}</span> */}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div >
            }
            <div className="content">
                {Video &&
                    <section>
                        <h2>Videos</h2>
                        <div className="listVideos">
                            {Video.map(element => {
                                if (element.type === 'Trailer') {
                                    return (
                                        <div className="cardVideo" key={element.key} onClick={() => showVideo(element.key)}>
                                            <img src={`https://img.youtube.com/vi/${element.key}/hqdefault.jpg`} alt={element.name} />
                                            <span>{element.name}</span>
                                            <i className="fa-solid fa-play btnPlay"></i>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </section>
                }
                {!hiddenVideo &&
                    <div className="containerVideo" onClick={(e) => showVideo(e)} >
                        <iframe src={`https://www.youtube.com/embed/${urlVideo}?autoplay=1;`} frameBorder="0" allow="accelerometer; clipboard-write; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe >
                    </div>
                }
                <section className="movieActor">
                    <h2>Elenco</h2>
                    <div className="actorList">
                        {Actor &&
                            Actor.cast.map(element => {
                                if (element.popularity > 20) {
                                    return (
                                        <div className="cardActor" key={element.id} onClick={() => location.href = `/actor?id=${element.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w200/` + element.profile_path} alt={element.original_name} />
                                            <h2>{element.original_name}</h2>
                                            <h3>{element.character}</h3>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </section>
                <section>
                    <h2>Títulos Semelhantes</h2>
                    <div className="actorList">
                        {Similar && Similar.map(element => <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />)}
                    </div>
                </section>
                <section>
                    <h2>Comentários</h2>
                    <div className="commentList">
                        {Comments && Comments.map(element => <CardComments key={element.id} comment={element} />)}
                    </div>
                </section>
            </div >
            <Footer />
        </>
    )
}



