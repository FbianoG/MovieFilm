import axios from "axios"


async function getSearchMoviesCategory(genres, page) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-br&page=${page}&sort_by=popularity.desc&with_genres=${genres}`, {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI' }
        })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response
        } else if (error.resquest) {
            return error.resquest
        } else {
            return false
        }
    }
}

async function getSearchMovies(keywords) {
    try {
        if (!keywords || keywords.trim() === '') {
            throw new Error('Não tem input')
        }
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${keywords}&language=pt-br`, {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI' }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response
        } else if (error.resquest) {
            return error.resquest
        } else {
            return false
        }
    }
}

export { getSearchMovies, getSearchMoviesCategory }




