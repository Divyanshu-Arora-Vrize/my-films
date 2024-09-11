import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import FavoriteMovies from './Components/FavoriteMovies';
import Watchlist from './Components/Watchlist';
import PrivacyPolicy from './Components/PrivacyPolicy'; // Import Privacy Policy
import TermsAndConditions from './Components/TermsAndConditions'; // Import Terms and Conditions

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy route */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> {/* Terms and Conditions route */}
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* Toast container */}
    </Router>
  );
};

export default App;
