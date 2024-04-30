import { useEffect, useState, useRef } from "react";
import Header from "../components/Shared/Header";
import CardMovie from "../components/Layout/CardMovie";
import './Movies.css'
import CountPage from "../components/Common/CountPage";
import Footer from "../components/Shared/Footer";
import getUser from "../api/getUser";
import getMovies from "../api/getMovies";
import Loading from "../components/Common/Loading";
import { getSearchMoviesCategory } from "../api/getSearchMovies";

export default function TopRated(props) {

    const urlQuery = new URLSearchParams(window.location.search).get('list')
    const urlQuery2 = new URLSearchParams(window.location.search).get('category')
    const urlPage = new URLSearchParams(window.location.search).get("page")
    const [Movies, setMovies] = useState(null)
    const [page, setPage] = useState(urlPage ? Number(urlPage) : 1)
    const [LoadingMovies, setLoadingMovies] = useState(false)


    async function loadMovies(e, n) {
        setLoadingMovies(true)
        let response = null
        if (urlQuery) {
            response = await getMovies(e, n)
        } else {
            response = await getSearchMoviesCategory(e, n)
        }
        if (!response) {
            console.log('Não possui query');
        } else if (response.status === 0 || response.status >= 500) {
            console.log('Erro de rede. Tente novamente.');
        } else if (response.status >= 300) {
            console.log(response.data);
        }
        console.log(urlQuery);
        setMovies(response)
        setLoadingMovies(false)
    }

    function getTitle(params) {
        if (urlQuery === 'top_rated') return 'Melhores Filmes'
        else if (urlQuery === 'popular') return 'Populares'

        else if(urlQuery2 == 28) return 'Filmes Ação'
        else if (urlQuery2 == 16) return 'Filmes Animação'
        else if (urlQuery2 == 35) return 'Filmes Comédia'
        else if (urlQuery2 == 18) return 'Filmes Drama'
        else if (urlQuery2 == 27) return 'Filmes Terror'
        else if (urlQuery2 == 878) return 'Filmes Ficção'
        else if (urlQuery2 == 10752) return 'Filmes Guerra'
    }

    useEffect(() => {
        loadMovies(urlQuery ? urlQuery : urlQuery2, page)
        props.bring()
    }, [page])

    
    return (
        <>
            <Header user={props.user} />
            <div className="content">
                <section>
                    <h2>{getTitle()}</h2>
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