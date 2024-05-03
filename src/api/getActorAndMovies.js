import axios from "axios"

async function getActorMovies(actorId) {
    try {
        if (!actorId) {
            throw new Error('Não possui ID.')
        }
        const response = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/credits?language=pt-BR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` }
        })
        return response.data.cast.filter(element => element.popularity >= 30)
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


async function getActor(actorId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?language=pt-br`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` }
        })
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

export { getActor, getActorMovies }