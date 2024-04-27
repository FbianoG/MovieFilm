import { useEffect, useRef, useState } from "react";
import Header from "../components/Shared/Header";
import getUser from "../api/getUser";
import './Perfil.css'
import MiniCardFavorite from "../components/Layout/MiniCardFavorite";
import getCompare from "../api/compareUser";


export default function Perfil() {

    const [User, setUser] = useState(false)
    const [Compare, setCompare] = useState(false)
    const [checkCompare, setCheckCompare] = useState(false)

    function logout() {
        localStorage.clear()
        location.href = '/'
    }

    useEffect(() => {
        async function name() {
            setUser(await getUser())
        }
        name()
    }, [])


    const emailCompare = useRef()

    async function gettCompare(e) {
        e.preventDefault()
        const getMoviesCompare = await getCompare(emailCompare.current.value)
        setCompare(getMoviesCompare)
        console.log(getMoviesCompare);
    }

    const otherCompare = useRef()
    const myCompare = useRef()
    const resultCompare = useRef()

    useEffect(() => {
        if (Compare) {

            const compare1 = Compare.user1.like
            const compare2 = Compare.user2.like
            const count = compare1.filter(element => {
                return compare2.find(e => element.id === e.id)
            })
            myCompare.current.textContent = `${(count.length / compare1.length * 100).toFixed(1)}% `
            otherCompare.current.textContent = `${(count.length / compare2.length * 100).toFixed(1)}% `
            resultCompare.current.textContent = `${(((count.length / compare1.length * 100) + (count.length / compare2.length * 100)) / 2).toFixed(1)}% `

            setCheckCompare(count)
            console.log(count);
        }

    }, [Compare])


    return (
        <>
            <Header user={User} />
            <div className="content">

                <div className="contentPerfil">

                    {User &&
                        <>
                            <div className="sidePerfil sectionPerfil">
                                <div className="logoPerfil">{User.name.slice(0, 1)}</div>
                                <p>{User.name}</p>
                                <span>{User.email}</span>
                                <div className="btnChangePassword"><i className="fa-solid fa-gear"></i>Alterar Senha</div>
                                <button onClick={logout}>Sair</button>
                            </div>

                            <div className="perfilData sectionPerfil" >
                                <form onSubmit={gettCompare}>
                                    <input type='text' name='' ref={emailCompare} placeholder="Comparar com" />
                                    <button type="submit">Comparar</button>
                                    {/* <input type='submit' name='' value='Comparar' /> */}
                                </form>

                                {Compare &&
                                    <>
                                        <div className="compare">
                                            <div className="dataCompare">
                                                <div className="infoCompare">
                                                    <p>{Compare.user1.name.split(' ').slice(0, 2).join(' ')}</p>
                                                    <div className="resultCompare" ref={myCompare}></div>
                                                    <span>Compatível</span>
                                                </div>
                                                <div className="infoCompare">
                                                    <p>{Compare.user2.name.split(' ').slice(0, 2).join(' ')}</p>
                                                    <div className="resultCompare" ref={otherCompare}></div>
                                                    <span>Compatível</span>
                                                </div>
                                            </div>
                                            <div className="totalCompare" ref={resultCompare}></div>
                                            <span>Média Compatível</span>
                                            <h3>Filmes Compatíves</h3>
                                        </div>
                                        <div className="listCompare">
                                            {checkCompare && checkCompare.map(element => <><img src={`https://image.tmdb.org/t/p/w200/${element.poster_path}`} alt={element.title} /></>)}
                                        </div>
                                    </>
                                }

                            </div>
                            <div className="perfilData sectionPerfil">

                            </div>
                            <div className="perfilFavorites sectionPerfil">
                                <h1>Favoritos</h1>
                                {/* <input type='search' name='' placeholder="" /> */}
                                <div className="listFavorites">
                                    {User.like.map(element => <MiniCardFavorite key={element.id} movie={element} />)}
                                </div>
                            </div>






                        </>
                    }







                </div>

            </div>
        </>
    )
}