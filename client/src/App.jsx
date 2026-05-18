import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Outfit from './pages/Outfit.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/outfit" element={<Outfit />} />
      </Routes>
    </Router>
  );
}

export default App