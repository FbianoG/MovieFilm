import { useEffect, useState, useRef } from "react";
import Header from "../components/Shared/Header";
import CardMovie from "../components/Layout/CardMovie";
import './Movies.css'

export default function TopRated() {

    const urlQuery = new URLSearchParams(window.location.search).get("category") 
    const [Movies, setMovies] = useState(false)
    const [count, setCount] = useState(1)
    const page = useRef()
    const mm = useRef()


    async function getMovies(params) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${urlQuery}?language=pt-BR&page=${count}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setMovies(data)
    }

    function nextPage() {
        setCount(count + 1)
    }
    function returnPage() {
        if (count - 1 < 1) {
            return
        }
        setCount(count - 1)
    }

    useEffect(() => {
        getMovies()
        page.current.textContent = count
    }, [count])

    return (
        <>
            <Header />
            <div className="content">
                <section>
                    <h1 ref={mm}>Melhores Filmes</h1>
                    <div className="count">
                        <button onClick={returnPage}>return</button>
                        <span ref={page}>1</span>
                        <button onClick={nextPage}>next</button>
                    </div>
                    <div className="listMovies">
                        {Movies &&
                            Movies.results.map(element => (
                                <CardMovie data={element} />
                            ))
                        }
                    </div>
                </section>
            </div >
        </>
    )
}