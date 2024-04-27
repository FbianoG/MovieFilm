import UrlBack from './api'

export default async function getUser() {
    const token = localStorage.getItem('Token')
    const response = await fetch(`${UrlBack}/getUser`, {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log('la');
    if (response.ok) {
        return data
    }
    // console.log(data);
}