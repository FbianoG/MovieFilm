import axios from 'axios';
import UrlBack from './api'

export default async function getCompare(email) {
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') {
            throw new Error("Usuário não logado.")
        }
        const response = await axios.post(`${UrlBack}/getCompareMovies`, { token, email })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response
        } else if (error.request) {
            return error.request
        } else {
            return false
        }
    }

}
