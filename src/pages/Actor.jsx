import { useEffect, useState } from 'react';
import './Actor.css'

import Header from '../components/Shared/Header'
import CardMovie from '../components/Layout/CardMovie';
import Footer from '../components/Shared/Footer';
import Loading from '../components/Common/Loading.jsx';

import { getActor, getActorMovies } from '../api/getActorAndMovies.js'



export default function Actor(props) {

    const actorId = new URLSearchParams(window.location.search).get("id")
    const [AllMovies, setAllMovies] = useState()
    const [Actor, setActor] = useState()


    async function actorMovies() { // Busca todos os filmes do ator
        const actorMovies = await getActorMovies(actorId)
        if (!actorMovies) {
            console.log('nao tem id');
        } else if (actorMovies.status >= 500 || actorMovies.status === 0) {
            console.log('Erro de rede. Tente novamente.')
        } else if (actorMovies.status >= 300) {
            console.log('não encontrado');
        } else {
            setAllMovies(actorMovies)
        }
    }

    async function actor() { // Busca detalhes do ator
        const actorMovies = await getActor(actorId)
        if (!actorMovies) {
            console.log('nao tem id');
        } else if (actorMovies.status >= 500 || actorMovies.status === 0) {
            console.log('Erro de rede. Tente novamente.')
        } else if (actorMovies.status >= 300) {
            console.log('não encontrado');
        } else {
            setActor(actorMovies)
        }
    }

    useEffect(() => {
        actor()
        actorMovies()
        props.bring()
    }, [])

    return (
        <>
            <Header user={props.user} />
            <div className="content">
                <section>
                    {Actor &&
                        <div className="containerActor">
                            <img src={`https://image.tmdb.org/t/p/w200/${Actor.profile_path
                                }`} alt={Actor.name} />
                            <div className="actorData">
                                <h2>{Actor.name}</h2>
                                <span>{Actor.birthday.split('-').reverse().join('/')} -  {Actor.place_of_birth}</span>
                                {Actor.deathday && <span>Morte: {Actor.deathday.split('-').reverse().join('/')}</span>}
                                <p>{Actor.biography}</p>
                            </div>
                        </div>
                    }
                </section>

                <section>
                    <h2>Principais Filmes</h2>
                    <div className="actorList">
                        {AllMovies && AllMovies.map(element => <CardMovie key={element.id} movie={element} user={props.user} bring={props.bring} />)}
                    </div>
                    {!AllMovies && <Loading />}
                </section>
            </div>
            <Footer />
        </>
    )
}