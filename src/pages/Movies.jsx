import { useEffect, useState, useRef } from "react";
import Header from "../components/Shared/Header";
import CardMovie from "../components/Layout/CardMovie";
import './Movies.css'
import CountPage from "../components/Common/CountPage";
import Footer from "../components/Shared/Footer";
import getUser from "../api/getUser";
import getMovies from "../api/getMovies";
import Loading from "../components/Common/Loading";

export default function TopRated(props) {


    const urlQuery = new URLSearchParams(window.location.search).get("category")
    const urlPage = new URLSearchParams(window.location.search).get("page")
    const [Movies, setMovies] = useState(false)
    const [page, setPage] = useState(urlPage ? Number(urlPage) : 1)
    const [User, setUser] = useState(false)
    const [LoadingMovies, setLoadingMovies] = useState(false)


    useEffect(() => {
        async function loadMovies(e, n) {
            console.log(n);
            setLoadingMovies(true)
            const response = await getMovies(e, n)
            if (!response) {
                console.log('Não possui query');
            } else if (response.status === 0 || response.status >= 500) {
                console.log('Erro de rede. Tente novamente.');
            } else if (response.status >= 300) {
                console.log(response.data);
            } else {
                setMovies(response)
            }
            setLoadingMovies(false)
        }
        loadMovies(urlQuery, page)
        props.bring()
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
                        {!Movies && LoadingMovies && <Loading />}
                    </div>
                </section>
            </div >
            <Footer />
        </>
    )
}