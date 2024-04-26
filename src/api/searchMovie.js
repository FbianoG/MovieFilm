

export default async function searchMovie() {
    if (searchInput.current.value.trim() === "") {
        searchList.current.style.display = ""
        return
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.current.value}&language=pt-BR`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGU3MDE2YjAyYjdiYmI4ODEyODJlNzNjNGM4MWJmMSIsInN1YiI6IjY0ZjdkNWVjMWI3MjJjMDBlMzRlYWRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ft4MagkdYM-1JNdJTiPpK6Er7VgEbUOQxC0_ZLX-SI'
        }
    })
    const data = await response.json()
    setSearchMovies(data)
    searchList.current.style.display = "flex"
}