import UrlBack from './api'

export default async function includeWatch(movie) {
    const token = localStorage.getItem('Token')

    // console.log(movie);
    // return
    const response = await fetch(`${UrlBack}/includeWatch`, {
        method: "POST",
        body: JSON.stringify({ token, movie }),
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data);
    if (response.ok) {
        // location.reload()
        return data
    }
}