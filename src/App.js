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

function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <CustomThemeProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </CustomThemeProvider>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
