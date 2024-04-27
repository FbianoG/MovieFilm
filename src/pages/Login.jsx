import { useRef, useState } from 'react'
import './Login.css'
import UrlBack from '../api/api.js'



export default function Login(props) {
   
    const [formCreateUser, setFormCreateUser] = useState(false)
    const loginAlert = useRef()
    const createEmail = useRef()
    const createPassword = useRef()
    const createName = useRef()
    const createDate = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()


    async function createUser(e) {
        e.preventDefault()
        const email = createEmail.current.value
        const password = createPassword.current.value
        const name = createName.current.value
        const date = createDate.current.value
        const response = await fetch(`${UrlBack}/createUser`, {
            method: "POST",
            body: JSON.stringify({ email, password, name, date }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        if (response.ok) {
            setFormCreateUser(false)
            loginAlert.current.textContent = data.message
            loginAlert.current.style.color = 'green'
        } else {
            loginAlert.current.textContent = data.message
            loginAlert.current.style.color = ''
        }
    }

    async function doLogin(e) {
        e.preventDefault()
        const email = inputEmail.current.value
        const password = inputPassword.current.value
        const response = await fetch(`${UrlBack}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        if (response.ok) {
            setFormCreateUser(false)
            localStorage.setItem("Token", data.token)
            loginAlert.current.textContent = ""
            loginAlert.current.style.color = ''
            props.bring()
            location.href = "/"
        } else {
            loginAlert.current.textContent = data.message
            loginAlert.current.style.color = ''
        }
    }


    return (
        <div className="loginContainer">
            <div className="loginSideApresentation"></div>
            <div className="formLogin">

                {formCreateUser &&
                    <form onSubmit={createUser}>
                        <div className="logo">MovieFilm</div>
                        <h3>Crie sua conta</h3>
                        <input type='text' name='' placeholder='Email' ref={createEmail} />
                        <input type='password' name='' placeholder='Senha' ref={createPassword} />
                        <input type='text' name='' placeholder='Nome Completo' ref={createName} />
                        <label htmlFor=''>Data de Nascimento</label>
                        <input type='date' name='' ref={createDate} />
                        <a onClick={() => setFormCreateUser(false)}>Cancelar</a>
                        <button type='submit' >Criar</button>
                    </form>
                }
                {!formCreateUser &&
                    <form onSubmit={doLogin}>
                        <div className="logo">MovieFilm</div>
                        <h3>Acesse sua conta</h3>
                        <input type='text' name='' placeholder='Email' ref={inputEmail} />
                        <input type='password' name='' placeholder='Senha' ref={inputPassword} />
                        <a onClick={() => setFormCreateUser(true)}>Cria nova conta</a>
                        <button type='submit'>Entrar</button>
                    </form>
                }

                <span className='loginAlert' ref={loginAlert}></span>
            </div>
        </div>
    )

}