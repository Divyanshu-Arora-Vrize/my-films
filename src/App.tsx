import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoriteMovies from './Components/FavoriteMovies';
import Watchlist from './Components/Watchlist';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* Updated path */}
      </Routes>
    </Router>
  );
};

export default App;
