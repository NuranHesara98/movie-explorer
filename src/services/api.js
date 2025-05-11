/**
 * @file api.js
 * @description Central service for interacting with The Movie Database (TMDb) API.
 * This file handles all API requests to fetch movie data, including trending movies,
 * search functionality, movie details, and filtered movies by various criteria.
 */

import axios from 'axios';

// Base API configuration
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || ''; // API key stored in .env file for security
const BASE_URL = 'https://api.themoviedb.org/3'; // TMDb API v3 base URL
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'; // TMDb image CDN base URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// API endpoints
export const getPopularMovies = (page = 1) => {
  return api.get('/movie/popular', { params: { page } });
};

export const getTrendingMovies = (timeWindow = 'day') => {
  return api.get(`/trending/movie/${timeWindow}`);
};

export const searchMovies = (query, page = 1) => {
  return api.get('/search/movie', { params: { query, page } });
};

export const getMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`, { params: { append_to_response: 'videos,credits' } });
};

export const getMoviesByGenre = (genreId, page = 1) => {
  return api.get('/discover/movie', { params: { with_genres: genreId, page } });
};

export const getMoviesByFilters = (filters, page = 1) => {
  const { genre, year, rating } = filters;
  
  // Prepare filter parameters
  const params = { page };
  
  if (genre) {
    params.with_genres = genre;
  }
  
  if (year) {
    params.primary_release_year = year;
  }
  
  if (rating) {
    params.vote_average = { gte: rating };
    params['vote_count.gte'] = 50; // Ensure movies have a minimum number of votes
  }
  
  return api.get('/discover/movie', { params });
};

export const getGenres = () => {
  return api.get('/genre/movie/list');
};

// Utility functions for images
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
};

export default api;
