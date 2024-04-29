import { useRef, useState } from 'react'
import axios from 'axios'
import './Login.css'
import UrlBack from '../api/api.js'


export default function Login(props) {

    const [formCreateUser, setFormCreateUser] = useState(false)
    const loginAlert = useRef()
    const [createEmail, setCreateEmail] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [createName, setCreateName] = useState('')
    const [createDate, setCreateDate] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [btnStatus, setBtnStatus] = useState(true)
    const [statusLoginAlert, setStatusLoginAlert] = useState(false)
    const [loginAlertText, setLoginAlertText] = useState('')

    async function createUser(e) {
        e.preventDefault()
        setBtnStatus(false)
        try {
            if (createEmail.trim() === '' || createPassword.trim() === '' || createName.trim() === '' || createDate.trim() === '') {
                throw new Error('Preencha todos os campos.')
            }
            const response = await axios.post(`${UrlBack}/createUser`, { email: createEmail, password: createPassword, name: createName, date: createDate })
            setFormCreateUser(false)
        } catch (error) {
            console.log(error);
            if (error.response) {
                setLoginAlertText(error.response.data.message)
            } else if (error.request) {
                setLoginAlertText('Erro de rede. Tente novamente.')
            } else {
                setLoginAlertText(error.message)
            }
            setStatusLoginAlert(true)
        }
        setBtnStatus(true)
        setTimeout(() => {
            setStatusLoginAlert(false)
        }, 7000);
    }



    async function doLogin(e) {
        e.preventDefault()
        setBtnStatus(false)
        try {
            if (inputEmail.trim() === '' || inputPassword.trim() === '') {
                throw new Error('Preencha todos os campos.')
            }
            const response = await axios.post(`${UrlBack}/login`, { email: inputEmail, password: inputPassword })
            localStorage.setItem("Token", response.data.token)
            await props.bring()
            location.href = sessionStorage.getItem('BackUrlPage')
        } catch (error) {
            console.log(error);
            if (error.response) {
                setLoginAlertText(error.response.data.message);
            } else if (error.request) {
                setLoginAlertText('Erro de rede. Tente novamente.');
            } else {
                setLoginAlertText(error.message);
            }
            setStatusLoginAlert(true);
        }
        setBtnStatus(true);
        setTimeout(() => {
            setStatusLoginAlert(false);
        }, 7000);
    }


    return (
        <div className="loginContainer">
            <div className="loginSideApresentation">
                <img src='https://c.wallhere.com/photos/e5/9b/movie_poster_people-1698949.jpg!d' alt='MovieFilm' />
                <ul>
                    <li>Encontre as melhores estreias e notícias do mundo do cinema.</li>
                    <li>Explore listas de filmes por gênero e popularidade em nosso site.</li>
                    <li>Curta seus filmes favoritos e organize listas personalizadas facilmente.</li>
                    <li>Mantenha-se atualizado com lançamentos e eventos especiais de filmes.</li>
                </ul>
            </div>
            <div className="formLogin">
                {formCreateUser &&
                    <form onSubmit={createUser}>
                        <div className="logo"><img src='https://fontmeme.com/permalink/240429/bf281d3de2ec95229df9488c262ebe50.png' alt='MovieFilm' /></div>
                        <h3>Crie sua conta</h3>
                        <input type='text' placeholder='Email' value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
                        <input type='password' placeholder='Senha' value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
                        <input type='text' placeholder='Nome Completo' value={createName} onChange={(e) => setCreateName(e.target.value)} />
                        <label htmlFor=''>Data de Nascimento</label>
                        <input type='date' value={createDate} onChange={(e) => setCreateDate(e.target.value)} />
                        <a onClick={() => setFormCreateUser(false)}>Cancelar</a>
                        {btnStatus &&
                            <button type='submit'>Criar Conta</button>
                        }
                        {!btnStatus &&
                            <button type='submit' disabled><i className="fa-solid fa-spinner fa-spin"></i> Criando...</button>
                        }
                    </form>
                }
                {!formCreateUser &&
                    <form onSubmit={doLogin}>
                        <div className="logo"><img src='https://fontmeme.com/permalink/240429/bf281d3de2ec95229df9488c262ebe50.png' alt='MovieFilm' /></div>
                        <h3>Acesse sua conta</h3>
                        <input type='text' placeholder='Email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                        <input type='password' placeholder='Senha' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                        <a onClick={() => setFormCreateUser(true)}>Cria nova conta</a>
                        {btnStatus &&
                            <button type='submit'>Acessar</button>
                        }
                        {!btnStatus &&
                            <button type='submit' disabled><i className="fa-solid fa-spinner fa-spin"></i> Acessando</button>
                        }
                    </form>
                }
                {statusLoginAlert &&
                    <div className='loginAlert' ref={loginAlert}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <div className="loginAlertData">
                            <h3>Ocorreu algum erro.</h3>
                            <span>{loginAlertText}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}