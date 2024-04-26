import { useEffect, useState } from 'react'
import './Favorites.css'
import includeFavorite from '../api/includeFavorite'
import getUser from '../api/getUser'
import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie'
import Footer from '../components/Shared/Footer'



export default function Favorites() {
    const [User, setUser] = useState(false)

    useEffect(() => {
        async function name(params) {
            setUser(await getUser())
        }
        name()
    }, [])




    return (
        <>
            <Header user={User} />
            <div className="content">
                <h1>Lista de Favoritos</h1>
                <div className="listMovies">
                    {User && User.like.length > 0 && User.like.map(element => <CardMovie key={element.id} movie={element} user={User} />)}
                    {User && User.like.length === 0 && <p>Não há filmes salvos em seus favoritos.</p>}
                    {!User && <p>Faça login para acessar esta página.</p>}
                </div>
            </div>

            <Footer />
        </>
    )
}