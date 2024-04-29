import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Movie from './pages/Movie'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Favorites from './pages/Favotites'
import Watch from './pages/Watch'
import Perfil from './pages/Perfil'
import getUser from './api/getUser'
import Actor from './pages/Actor'

function App() {

  const [User, setUser] = useState(false)

  async function bringUser() {
    setUser(await getUser())
  }

  useEffect(() => {
    // bringUser()
  }, [])


  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home user={User} bring={bringUser} />} />
          <Route path="/movie" element={<Movie user={User} bring={bringUser} />} />
          <Route path="/movies" element={<Movies user={User} bring={bringUser} />} />
          <Route path="/login" element={<Login user={User} bring={bringUser} />} />
          <Route path="/favorites" element={<Favorites user={User} bring={bringUser} />} />
          <Route path="/watch" element={<Watch user={User} bring={bringUser} />} />
          <Route path="/perfil" element={<Perfil user={User} bring={bringUser} />} />
          <Route path="/actor" element={<Actor user={User} bring={bringUser} />} />
        </Routes>
      </Router>
  )
}

export default App
