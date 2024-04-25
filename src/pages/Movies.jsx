import { useEffect, useState, useRef } from "react";
import Header from "../components/Shared/Header";
import CardMovie from "../components/Layout/CardMovie";
import './Movies.css'
import CountPage from "../components/Common/CountPage";
import Footer from "../components/Shared/Footer";

export default function TopRated() {

    const urlQuery = new URLSearchParams(window.location.search).get("category")
    const [Movies, setMovies] = useState(false)
    const [page, setpage] = useState(1)


    async function getMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${urlQuery}?language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setMovies(data)
    }



    useEffect(() => {
        getMovies()
    }, [page])


    return (
        <>
            <Header />
            <div className="content">
                <section>
                    <h1>Melhores Filmes</h1>
                    <CountPage page={{ page, setpage }} />
                    <div className="listMovies">
                        {Movies &&
                            Movies.results.map(element => (
                                <CardMovie data={element} />
                            ))
                        }
                    </div>
                </section>
            </div >
            <Footer />
        </>
    )
}