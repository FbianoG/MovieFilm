import './Movie.css'
import Header from '../components/Shared/Header'
import { useEffect, useState } from 'react'
import Footer from '../components/Shared/Footer'


export default function Movie() {

    const [Movie, setMovie] = useState(false)
    const [Actor, setActor] = useState(false)
    const movieId = new URLSearchParams(window.location.search).get("id")

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
        console.log(data);
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

    useEffect(() => {
        getMovie()
        getActor()
    }, [])



    function formatarEmReais(numero) {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return formatador.format(numero);
    }




    return (
        <>
            <Header />

            {Movie &&
                <div className='movieContainer'>
                    <img src={"https://image.tmdb.org/t/p/original/" + Movie.backdrop_path} alt={Movie.title} />
                    <div className="movieData">
                        <h1>{Movie.title}</h1>
                        <h2>{Movie.tagline}</h2>
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
                        {Movie.homepage &&
                            <a href={Movie.homepage} target='_blank'>{Movie.homepage}</a>
                        }
                        <div className="movieCosts">
                            <p>Origem:</p>
                            <span>{(Movie.origin_country[0])}</span>
                            <p>Orçamento:</p>
                            <span>{formatarEmReais(Movie.budget * 5.2)}</span>
                            <p>Lucro:</p>
                            <span>{formatarEmReais(Movie.revenue * 5.2)}</span>
                        </div>
                        <div className="movieProduction">
                            {Movie.production_companies.map(element => {
                                if (!element.logo_path) {
                                    return
                                }
                                return (
                                    <div className="cardMovieProduction" key={element.id}>
                                        <img src={"https://image.tmdb.org/t/p/w200/" + element.logo_path} alt={element.name} />
                                        {/* <span>{element.name}</span> */}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            }
            <div className="content">
                <section className="movieActor">
                    <h2>Elenco</h2>
                    <div className="actorList">
                        {Actor &&
                            Actor.cast.map(element => {
                                if (element.popularity > 20) {
                                    return (
                                        <div className="cardActor" key={element.id}>
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

                </section>
            </div>

            <Footer />
        </>
    )
}