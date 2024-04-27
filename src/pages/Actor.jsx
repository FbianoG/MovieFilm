import { useEffect, useState } from 'react';
import Header from '../components/Shared/Header'
import './Actor.css'
import CardMovie from '../components/Layout/CardMovie';
import Footer from '../components/Shared/Footer';




export default function Actor(props) {

    const actorId = new URLSearchParams(window.location.search).get("id")
    const [AllMovies, setAllMovies] = useState()
    const [Actor, setActor] = useState()

    async function getMoviesActor() {
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/credits?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setAllMovies(data.cast.filter(element => element.popularity >= 30))
    }

    async function getActor() {
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?language=pt-br`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
            }
        })
        const data = await response.json()
        setActor(data);
    }

    useEffect(() => {
        getMoviesActor()
        getActor()
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
                </section>
            </div>
            <Footer />
        </>
    )
}