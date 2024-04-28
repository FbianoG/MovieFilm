import { useEffect, useState, useRef } from 'react'
import './Home.css'
import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import MiniCardFavorite from '../components/Layout/MiniCardFavorite'
import Footer from '../components/Shared/Footer'
import getUser from '../api/getUser'


export default function Home(props) {
    const [topMovies, setTopMovies] = useState(false)
    const [upcomingMovies, setUpcomingMovies] = useState(false)
    const [trending, setTrending] = useState(false)
    // const [User, setUser] = useState(false)


    async function getTopRated() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setTopMovies(data)
    }

    async function getUpcoming() {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-br&region=br', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setUpcomingMovies(data)
    }

    async function getTrending() {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?language=pt-BR', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setTrending(data)
    }

    useEffect(() => {
        getTopRated()
        getUpcoming()
        getTrending()
        props.bring()
        // setUser(props.user)
        // async function name() {
        //     setUser(await getUser())
        // }
        // name()
    }, [])




    function moreMovies(params) {
        location.href = `/movies?category=${params}`
    }





    return (
        <>
            <Header user={props.user} />
            <div className='content'>
                <div className='banner'>
                    <img src='/freepik-export-20240424163048WEsm.jpeg' alt='' />
                </div>

                <section>
                    <div className='listMovies'>
                        <div className='infoSection'>
                            <h1>Filmes</h1>
                            <h1>em Alta</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Mais assistidos da semana</p>
                            <a href='/movies?category=popular'>Veja mais</a>
                        </div>
                        {trending && trending.results.map((element, index) => {
                            if (index > 11) {
                                return
                            }
                            return (
                                <CardMovie movie={element} user={props.user} bring={props.bring} key={element.id} />
                            )
                        })}
                    </div>
                    <a href='/movies?category=popular' className='btnEndViewMore'>Veja mais</a>
                </section>

                <section>
                    <div className='listMovies'>
                        <div className='infoSection'>
                            <h1>Filmes</h1>
                            <h1>em Breve</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Próximos lançamentos</p>
                            <a href='/'>Veja mais</a>
                        </div>
                        {upcomingMovies &&
                            upcomingMovies.results.map((element, index) => {
                                if (index > 11) {
                                    return
                                }
                                return (
                                    <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />
                                )
                            })
                        }
                    </div>

                </section>

                <div className='banner'>
                    <img src='https://skycms.s3.amazonaws.com/images/43136174/Banner_large.png' alt='' />
                </div>

                <section>

                    <div className='listMovies'>
                        <div className='infoSection'>
                            <h1>Filmes</h1>
                            <h1>Melhores Notas</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Maiores notas de todos os tempos</p>
                            <a href='/movies?category=top_rated'>Veja mais</a>
                        </div>
                        {topMovies &&
                            topMovies.results.map((element, index) => {
                                if (index > 11) {
                                    return
                                }
                                return (
                                    <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />
                                )
                            })
                        }
                    </div>
                    <a href='/movies?category=top_rated' className='btnEndViewMore'>Veja mais</a>
                </section>
            </div>
            <Footer />
        </>
    )
}