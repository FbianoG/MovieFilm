import axios from "axios";

export default async function getMovies(urlQuery, page) {

    try {
        if (!urlQuery) {
            throw new Error('não possui query')
        }
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${urlQuery}?language=pt-BR&page=${page}&region=br`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        })
        return response.data
    } catch (error) {
        if (error.resquest) throw error
        else throw false
    }

}