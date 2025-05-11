import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { CustomThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

/**
 * Main App component that sets up routing and providers
 * @returns {JSX.Element} The App component
 */
function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <CustomThemeProvider>
          <div className="App">
            <Routes>
              {/* Public route for login page */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected routes - requires authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={
                  <>
                    <Navbar />
                    <HomePage />
                  </>
                } />
                <Route path="/movie/:id" element={
                  <>
                    <Navbar />
                    <MovieDetailsPage />
                  </>
                } />
                <Route path="/search" element={
                  <>
                    <Navbar />
                    <SearchResultsPage />
                  </>
                } />
                <Route path="/favorites" element={
                  <>
                    <Navbar />
                    <FavoritesPage />
                  </>
                } />
              </Route>
              
              {/* Catch all other routes and redirect to root */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </CustomThemeProvider>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
