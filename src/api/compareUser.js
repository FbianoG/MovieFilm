import UrlBack from './api'

export default async function getCompare(email) {
    const token = localStorage.getItem('Token')
    const response = await fetch(`${UrlBack}/getCompareMovies`, {
        method: "POST",
        body: JSON.stringify({ token, email }),
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data);
    if (response.ok) {
        return data
    }
}