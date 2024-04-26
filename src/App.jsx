import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Favorites from './pages/Favotites'
import Perfil from './pages/Perfil'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  )
}

export default App
