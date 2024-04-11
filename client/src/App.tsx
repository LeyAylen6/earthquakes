import './App.css'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About/About';
import Detail from './pages/Detail';
import NavBar from './components/Navbar';


const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', width: "90vw", height: "80vh" }}>
      <CssBaseline />
      <NavBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features/:id" element={<Detail />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
