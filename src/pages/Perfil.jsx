import { useEffect, useState } from "react";
import Header from "../components/Shared/Header";
import getUser from "../api/getUser";
import './Perfil.css'
import MiniCardFavorite from "../components/Layout/MiniCardFavorite";


export default function Perfil() {

    const [User, setUser] = useState(false)

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

                            <div className="perfilData sectionPerfil">

                            </div>
                            <div className="perfilData sectionPerfil">

                            </div>
                            <div className="perfilFavorites sectionPerfil">
                                <h1>Favoritos</h1>
                                {/* <input type='search' name='' placeholder="" /> */}
                                <div className="listFavorites">
                                    {User.like.map(element => <MiniCardFavorite movie={element} />)}
                                </div>
                            </div>






                        </>
                    }







                </div>

            </div>
        </>
    )
}