import { useEffect, useState, useRef } from 'react'
import './Home.css'
import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import MiniCardFavorite from '../components/Layout/MiniCardFavorite'
import Footer from '../components/Shared/Footer'
import getUser from '../api/getUser'


export default function Home() {
    const [topMovies, setTopMovies] = useState(false)
    const [popularMovies, setPopularMovies] = useState(false)
    const [User, setUser] = useState(false)


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

    async function getPopular() {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setPopularMovies(data)
    }


    useEffect(() => {
        getTopRated()
        getPopular()
        async function name() {
            setUser(await getUser())
        }
        name()
    }, [])




    function moreMovies(params) {
        location.href = `/movies?category=${params}`
    }


    


    return (
        <>
            <Header user={User} />
            <div className="content">
                <div className="banner">
                    <img src="/freepik-export-20240424163048WEsm.jpeg" alt='' />
                </div>
                <section>
                    <h1>Populares</h1>
                    <div className="listMovies">
                        {popularMovies &&
                            popularMovies.results.map((element, index) => {
                                if (index > 13) {
                                    return
                                }
                                return (
                                    <CardMovie movie={element} user={User} key={element.id} />
                                )
                            })
                        }
                    </div>
                    <button onClick={() => moreMovies('popular')}>Veja mais...</button>
                </section>
                <div className="banner">
                    <img src="https://skycms.s3.amazonaws.com/images/43136174/Banner_large.png" alt='' />
                </div>
                <section>
                    <h1>Melhores Filmes</h1>
                    <div className="listMovies">
                        {topMovies &&
                            topMovies.results.map((element, index) => {
                                if (index > 13) {
                                    return
                                }
                                return (
                                    <CardMovie movie={element} user={User} key={element.id} />
                                )
                            })
                        }
                    </div>
                    <button onClick={() => moreMovies('top_rated')}>Veja mais...</button>
                </section>

                <section>
                    <h1>Favoritos</h1>
                    <div className="listFavorites">
                        {/* {User &&
                            User.like.map(element => <MiniCardFavorite data={element} key={element.id}/>)
                        } */}
                    </div>

                </section>


            </div>




            <Footer />






        </>
    )
}