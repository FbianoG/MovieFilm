import axios from 'axios'
import UrlBack from './api'

export default async function getUser() {
    const token = localStorage.getItem('Token')

    try {
        if (!token || token.trim() === '') {
            throw new Error('Usuário não conectado.')
        }
        const response = await axios.post(`${UrlBack}/getUser`, { token })
        return response.data
    } catch (error) {
        if (error.request) throw error
        else throw false
    }
}
 