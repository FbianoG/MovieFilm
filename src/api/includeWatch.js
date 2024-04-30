import axios from 'axios'
import UrlBack from './api'

export default async function includeWatch(movie) {
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') {
            throw new Error('Token nulo.')
        }
        const response = await axios.post(`${UrlBack}/includeWatch`, { token, movie })
        return response.data
    } catch (error) {
        if (error.request) throw error
        else throw false
    }
}