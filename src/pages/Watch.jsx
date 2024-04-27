import { useEffect, useState } from 'react'
import './Watch.css'
import includeFavorite from '../api/includeFavorite'
import getUser from '../api/getUser'
import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import Footer from '../components/Shared/Footer'



export default function Watch(props) {

    useEffect(() => {
        props.bring()
    }, [])


    return (
        <>
            <Header user={props.user} />
            <div className="content">
                <h1>Lista Para Assistir Depois</h1>
                <div className="listMovies">
                    {props.user && props.user.watch.length > 0 && props.user.watch.map(element => <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />)}
                    {props.user && props.user.watch.length === 0 && <p>Não há filmes salvos em seus favoritos.</p>}
                    {!props.user && <p>Faça login para acessar esta página.</p>}
                </div>
            </div>
            <Footer />
        </>
    )
}