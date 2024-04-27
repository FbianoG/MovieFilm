import { useEffect, useState, useRef } from "react";
import Header from "../components/Shared/Header";
import CardMovie from "../components/Layout/CardMovie";
import './Movies.css'
import CountPage from "../components/Common/CountPage";
import Footer from "../components/Shared/Footer";
import getUser from "../api/getUser";

export default function TopRated(props) {


    const urlQuery = new URLSearchParams(window.location.search).get("category")
    const urlPage = new URLSearchParams(window.location.search).get("page")
    const [Movies, setMovies] = useState(false)
    const [page, setPage] = useState(1)
    const [User, setUser] = useState(false)


    async function getMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${urlQuery}?language=pt-BR&page=${page}&region=br`, {
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
        props.bring()
        if (urlPage) {
            setPage(Number(urlPage))
        }
    }, [page])


    function getTitle(params) {
        if (urlQuery === 'top_rated') {
            return 'Melhores Filmes'
        } else if (urlQuery === 'popular') {
            return 'Populares'
        }
    }


    return (
        <>
            <Header user={props.user} />
            <div className="content">
                <section>
                    <h1>{getTitle()}</h1>
                    <CountPage page={{ page, setPage }} />
                    <div className="listMovies">
                        {Movies && Movies.results.map(element => <CardMovie movie={element} user={props.user} bring={props.bring} key={element.id} />)}
                    </div>
                </section>
            </div >
            <Footer />
        </>
    )
}