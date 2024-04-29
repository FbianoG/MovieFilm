import { useEffect, useState } from 'react'
import './Favorites.css'
import includeFavorite from '../api/includeFavorite'
import getUser from '../api/getUser'
import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import Footer from '../components/Shared/Footer'
import Loading from '../components/Common/Loading'



export default function Favorites(props) {

    useEffect(() => {
        props.bring()
    }, [])

    return (
        <>
            <Header user={props.user} />
            <div className="content">
                <h1>Lista de Favoritos</h1>
                <div className="listMovies">
                    {props.user && props.user.like.length > 0 && props.user.like.map(element => <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />)}
                    {props.user && props.user.like.length === 0 && <p>Não há filmes salvos em seus favoritos.</p>}
                    {!props.user && <Loading />}
                </div>
            </div>
            <Footer />
        </>
    )
}