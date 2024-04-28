import { useEffect, useRef, useState } from 'react'
import './CardMovie.css'
import includeFavorite from '../../api/includeFavorite'



export default function CardMovie(props) {

    function movieFilm(e, params) {
        if (e.target.id === 'btnLike') {
            return
        }
        location.href = `/movie?id=${params}`
    }

    async function addFavorite(e) {
        await includeFavorite(e)
        await props.bring()
    }


    return (
        <div className='cardMovie' onClick={(e) => movieFilm(e, props.movie.id)}>
            {props.user &&
                props.user.like.some(element => (element.id === props.movie.id)) &&
                <i className='fa-solid fa-heart' id='btnLike' onClick={() => addFavorite(props.movie)}></i>
            }
            {props.user &&
                !props.user.like.some(element => (element.id === props.movie.id)) &&
                <i className='fa-regular fa-heart' id='btnLike' onClick={() => addFavorite(props.movie)}></i>
            }
            <img src={'https://image.tmdb.org/t/p/w300/' + props.movie.poster_path} alt={props.movie.title} />

            <div className='cardMovieData'>
                <h3 className='cardMovieTitle'>{props.movie.title}</h3>
                <div className='cardMovieVote'>
                    <p>{props.movie.release_date.slice(0, 4)}</p>
                    <span><i className='fa-solid fa-star'></i>{props.movie.vote_average.toFixed(1)}</span>
                    <span><i className='fa-solid fa-ticket'></i>{props.movie.vote_count}</span>
                </div>
            </div>
        </div>

    )
}