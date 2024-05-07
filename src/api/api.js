import axios from "axios"

const UrlBack = "https://movie-film-back.vercel.app"
// const UrlBack = "http://localhost:3000"


async function getUser() { // Get dados do usuário
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') throw new Error('Usuário não conectado.')
        const response = await axios.post(`${UrlBack}/getUser`, { token })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getMovie(movieId) { // Get filme
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getMovies(urlQuery, page) { // Lista de filmes por typo (melhores, populares, em breve)
    try {
        if (!urlQuery) throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${urlQuery}?language=pt-BR&page=${page}&region=br`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getSearchMovies(keywords) { // Lista de filmes por keywords
    try {
        if (!keywords || keywords.trim() === '') throw new Error('Não tem input')
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${keywords}&language=pt-br`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getSearchMoviesCategory(genres, page) { // Lista de filmes por categoria
    try {
        if (!genres || genres.trim() === '') throw new Error('Gênero não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-br&page=${page}&sort_by=popularity.desc&with_genres=${genres}`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getSimilar(movieId) { // Filmes similares
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=pt-br`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data.results
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function includeFavorite(movie) { // Adicionar 'Favoritos'
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') throw new Error('Não tem token.')
        const response = await axios.post(`${UrlBack}/includeFavorite`, { token, movie })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function includeWatch(movie) { // Adicionar 'Assistir Depois'
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') throw new Error('Token nulo.')
        const response = await axios.post(`${UrlBack}/includeWatch`, { token, movie })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getCompare(email) { // Busca dados dos usuários para fazer compração de filmes
    const token = localStorage.getItem('Token')
    try {
        if (!token || token.trim() === '') throw new Error("Usuário não logado.")
        const response = await axios.post(`${UrlBack}/getCompareMovies`, { token, email })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }

}

async function getElenco(movieId) { // Elenco do filme
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-BR`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getActor(actorId) { // Detalhes do ator
    try {
        if (!actorId || actorId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?language=pt-br`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getActorMovies(actorId) { // Filmegrafia do ator
    try {
        if (!actorId || actorId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/credits?language=pt-BR`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data.cast.filter(element => element.popularity >= 30)
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getProviders(movieId) { // Provedores do filme
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data.results.BR.rent
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getComments(movieId) { // Comentários do filme
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=pt-br`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data.results
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getVideos(movieId) { // Vídeos do filme
    try {
        if (!movieId || movieId.trim() === '') throw new Error('Id não fornecido.')
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=`, { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } })
        return response.data.results
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

export { UrlBack, getUser, getMovie, getMovies, getSearchMovies, getSearchMoviesCategory, getSimilar, includeFavorite, includeWatch, getCompare, getElenco, getActor, getActorMovies, getProviders, getComments, getVideos }
