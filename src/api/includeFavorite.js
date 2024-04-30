import axios from 'axios';
import UrlBack from './api'

export default async function includeFavorite(movie) {
    const token = localStorage.getItem('Token')

    try {
        if (!token || token.trim() === '') {
            throw new Error('Não tem token.')
        }
        const response = await axios.post(`${UrlBack}/includeFavorite`, { token, movie })
        return response.data
    } catch (error) {
        if (error.request) throw error
        else throw false
    }

}