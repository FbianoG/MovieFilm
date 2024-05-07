import { useEffect, useState, useRef } from 'react'
import './Home.css'

import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import Footer from '../components/Shared/Footer'
import Loading from '../components/Common/Loading'
import { getMovies } from '../api/api'

export default function Home(props) {
    const [trending, setTrending] = useState(false)
    const [upcomingMovies, setUpcomingMovies] = useState(false)
    const [topMovies, setTopMovies] = useState(false)

    async function loadMovies(e, n) {
        try {
            const response = await getMovies(e, n)
            return response
        } catch (error) {
            if (!error) return null
            else if (!error.response) return null
            else return null
        }
    }

    async function getAllMovies() {
        setTrending(await loadMovies('popular', 1))
        setUpcomingMovies(await loadMovies('upcoming', 1))
        setTopMovies(await loadMovies('top_rated', 1))
    }


    useEffect(() => {
        getAllMovies()
        props.bring()
    }, [])

    return (
        <>
            <Header user={props.user} />
            <div className='content'>
                <div className='banner'>
                    <img src='https://skycms.s3.amazonaws.com/images/43136174/Banner_large.png' alt='' />
                </div>
                <section>
                    <div className='listMovies'>
                        <div className='listMoviesInfo'>
                            <h1>Filmes</h1>
                            <h1>em Alta</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Mais assistidos da semana</p>
                            <a href='/movies?list=popular'>Veja mais <i className="fa-solid fa-chevron-right"></i></a>
                        </div>
                        {trending && trending.results.map((element, index) => {
                            if (index > 11) return
                            return <CardMovie movie={element} user={props.user} bring={props.bring} key={element.id} />
                        })}
                        {!trending && <Loading />}
                    </div>
                    <a href='/movies?list=popular' className='btnEndViewMore'>Veja mais</a>
                </section>
                <section>
                    <div className='listMovies'>
                        <div className='listMoviesInfo'>
                            <h1>Filmes</h1>
                            <h1>em Breve</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Próximos lançamentos</p>
                            <a href='/'>Veja mais <i className="fa-solid fa-chevron-right"></i></a>
                        </div>
                        {upcomingMovies && upcomingMovies.results.map((element, index) => {
                            if (index > 11) return
                            return <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />
                        })}
                        {!upcomingMovies && <Loading />}
                    </div>
                </section>
                <div className='banner'>
                    <img src='https://skycms.s3.amazonaws.com/images/43136174/Banner_large.png' alt='' />
                </div>
                <section>
                    <div className='listMovies'>
                        <div className='listMoviesInfo'>
                            <h1>Filmes</h1>
                            <h1 >Melhores Notas</h1>
                            <h1>Acompanhe Agora</h1>
                            <p>Maiores notas de todos os tempos</p>
                            <a href='/movies?list=top_rated'>Veja mais <i className="fa-solid fa-chevron-right"></i></a>
                        </div>
                        {topMovies && topMovies.results.map((element, index) => {
                            if (index > 11) return
                            return <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />
                        })}
                        {!topMovies && <Loading />}
                    </div>
                    <a href='/movies?list=top_rated' className='btnEndViewMore'>Veja mais</a>
                </section>
            </div>
            <Footer />
        </>
    )
}