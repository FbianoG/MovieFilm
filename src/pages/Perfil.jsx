import { useEffect, useRef, useState } from "react";
import Header from "../components/Shared/Header";
import getUser from "../api/getUser";
import './Perfil.css'
import MiniCardFavorite from "../components/Layout/MiniCardFavorite";
import getCompare from "../api/compareUser";
import Loading from "../components/Common/Loading";


export default function Perfil() {

    const [User, setUser] = useState(false)
    const [LoadUser, setLoadUser] = useState(false)
    const [LoadCompare, setLoadCompare] = useState(false)
    const [Compare, setCompare] = useState(false)
    const [checkCompare, setCheckCompare] = useState(false)
    const [inputEmail, setInputEmail] = useState('')

    function logout() {
        localStorage.clear()
        location.href = '/'
    }



    useEffect(() => {
        async function getDataUser() {
            setLoadUser(true)
            const user = await getUser()
            if (!user) {
                return
            } else if (user.status == 0 || user.status >= 500) {
                console.log('Erro de rede. Tente novamente');
            } else if (user.status >= 300) {
                // console.log(user)
            } else {
                setUser(user)
                setLoadUser(false)
            }
        }
        getDataUser()
    }, [])

    async function gettCompare(e) {
        e.preventDefault()
        setCompare(false)
        setLoadCompare(true)
        const getMoviesCompare = await getCompare(inputEmail)
        console.log(getMoviesCompare);
        if (!getMoviesCompare) {
            console.log('Não tem token');
            return
        } else if (getMoviesCompare.status === 0 || getMoviesCompare.status >= 500) {
            console.log('Erro de rede. Tente novamente');
        } else if (getMoviesCompare.status >= 300) {
            console.log(getMoviesCompare.data.message)
        } else {
            setCompare(getMoviesCompare)
        }
        setLoadCompare(false)
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
            // console.log(count);
        }

    }, [Compare])


    return (
        <>
            <Header user={User} />
            <div className="content">

                {User &&
                    <div className="contentPerfil">
                        <div className="sidePerfil sectionPerfil">
                            <div className="logoPerfil">{User.name.slice(0, 1)}</div>
                            <p>{User.name}</p>
                            <span>{User.email}</span>
                            <div className="btnChangePassword"><i className="fa-solid fa-gear"></i>Alterar Senha</div>
                            <button onClick={logout}>Sair</button>
                        </div>

                        <div className="perfilData sectionPerfil" >
                            <form onSubmit={gettCompare}>
                                <input type='text' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Comparar com" />
                                <button type="submit">Comparar</button>
                                {/* <input type='submit' name='' value='Comparar' /> */}
                            </form>

                            {Compare &&
                                <div>
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
                                </div>
                            }
                            {LoadCompare && <Loading />}

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
                    </div>
                }
                {LoadUser && <Loading />}
            </div >
        </>
    )
}