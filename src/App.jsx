import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Movies from './pages/Movies'
import Login from './pages/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
