import { useRef } from 'react'
import './CardMovie.css'



export default function CardMovie(props) {

    const cardMovie = useRef()

    function movieFilm(params) {
        window.open(`/movie?id=${params}`, '_blank')
    }




    return (
        <div className="cardMovie" key={props.data.id} onClick={() => movieFilm(props.data.id)}>

            <img src={"https://image.tmdb.org/t/p/w200/" + props.data.poster_path} alt={props.data.title} />

            <div className="cardMovieData">

                <div className="cardMovieTitle">
                    <h3>{props.data.title}</h3>
                    <p>{props.data.release_date.slice(0, 4)}</p>
                </div>

                <div className="cardMovieVote">
                    <span><i className="fa-solid fa-star"></i>{props.data.vote_average.toFixed(1)}</span>
                    <span><i className="fa-solid fa-receipt"></i>{props.data.vote_count}</span>
                </div>

            </div>
        </div>

    )
}