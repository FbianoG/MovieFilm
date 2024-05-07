import { useEffect, useRef, useState } from "react";
import Header from "../components/Shared/Header";
import getUser from "../api/getUser";
import './Perfil.css'
import MiniCardFavorite from "../components/Layout/MiniCardFavorite";
import getCompare from "../api/compareUser";
import Loading from "../components/Common/Loading";
import ToastAlert from "../components/Common/ToastAlert";
import axios from "axios";
import UrlBack from "../api/api";


export default function Perfil(props) {

    const [LoadUser, setLoadUser] = useState(false)
    const [LoadCompare, setLoadCompare] = useState(false)
    const [Compare, setCompare] = useState(false)
    const [checkCompare, setCheckCompare] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const [allUser, setAllUser] = useState([])

    const otherCompare = useRef()
    const myCompare = useRef()
    const resultCompare = useRef()

    function logout() {
        // localStorage.clear()
        setTextAlert('Fazendo logout.')
        setTypeAlert('alert')
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            location.href = '/'
        }, 5000);
    }

    const [textAlert, setTextAlert] = useState('')
    const [typeAlert, setTypeAlert] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    function toastShow() {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 6000);
    }

    async function gettCompare(e, email) {
        e.preventDefault()
        setCompare(false)
        setLoadCompare(true)
        try {
            const response = await getCompare(email ? email : inputEmail)
            setCompare(response)
        } catch (error) {
            if (!error) setTextAlert('Faça login novamente.')
            else if (!error.response) setTextAlert('Erro de rede. Tente novamente.')
            else if (error.response) setTextAlert(error.response.data.message)
            setTypeAlert('error')
            toastShow()
        }
        setLoadCompare(false)
    }

    useEffect(() => {  // ! mexer nesse código depois
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
        }

    }, [Compare])


    async function getAllUser() {
        const response = await axios.post(`${UrlBack}/getAllUser`, { token: localStorage.getItem('Token') })
        setAllUser(response.data)
        console.log(response);
    }

    function showAllUser() {
    }




    useEffect(() => {
        setLoadUser(true)
        getAllUser()
        async function name() {
            const response = await props.bring()
            await setLoadUser(false)
        }
        name()
    }, [])


    return (
        <>
            <Header user={props.user} />
            <div className="content">

                {props.user &&
                    <div className="contentPerfil">
                        <div className="sidePerfil sectionPerfil">
                            <div className="logoPerfil">{props.user.name.slice(0, 1)}</div>
                            <p>{props.user.name}</p>
                            <span>{props.user.email}</span>
                            <div className="btnChangePassword"><i className="fa-solid fa-gear"></i>Alterar Senha</div>
                            <button onClick={logout}>Sair</button>
                        </div>

                        <div className="perfilData sectionPerfil" >
                            <form onSubmit={gettCompare}>
                                <input type='text' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} onFocus={showAllUser} placeholder="Comparar com" />
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

                        <div className="perfilData sectionPerfil" >
                            <h3 className="perfilData__title">Comparar com </h3>
                            {allUser.map(element => (
                                <div className="allUser" onClick={(e) => gettCompare(e, element.email)}>
                                    <div className="allUser__avatar">{element.name.slice(0, 1)}</div>
                                    <div className="allUser__data">
                                        <span className="allUser__dataName">{element.name.split(' ').slice(0, 2).join(' ')}</span>
                                        <span className="allUser__dataEmail">{element.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                }
                {LoadUser && <Loading />}
            </div >
            {showAlert && <ToastAlert text={textAlert} type={typeAlert} />}
        </>
    )
}