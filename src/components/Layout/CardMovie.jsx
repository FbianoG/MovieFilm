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


    function verifyClass(e) {
        if (e === 'fa-solid fa-heart') return 'fa-regular fa-heart'
        else return 'fa-solid fa-heart'
    }


    async function addFavorite(e, movie) {
        e.target.className = verifyClass(e.target.className)
        try {
            const response = await includeFavorite(movie)
        } catch (error) {
            console.log(error);
            e.target.className = verifyClass(e.target.className)
        }
    }


    return (
        <div className='cardMovie' onClick={(e) => movieFilm(e, props.movie.id)}>
            {props.user && props.user.like.some(element => (element.id === props.movie.id)) &&
                <i className='fa-solid fa-heart' id='btnLike' onClick={(e) => addFavorite(e, props.movie)}></i>
            }
            {props.user && !props.user.like.some(element => (element.id === props.movie.id)) &&
                <i className='fa-regular fa-heart' id='btnLike' onClick={(e) => addFavorite(e, props.movie)}></i>
            }
            <img src={'https://image.tmdb.org/t/p/w300/' + props.movie.poster_path} alt={props.movie.title} />

            <div className='cardMovieData'>
                <h3 >{props.movie.title}</h3>
                <div className='cardMovieDataDetails'>
                    <span>{props.movie.release_date.slice(0, 4)}</span>
                    <div>
                        <i className='fa-solid fa-star'></i>
                        {props.movie.vote_average.toFixed(1)}
                    </div>
                    <div>
                        <i className='fa-solid fa-ticket'></i>
                        {props.movie.vote_count}
                    </div>
                </div>
            </div>
        </div>

    )


}