/**
 * @file MovieContext.js
 * @description Global state management for the Movie Explorer application using React Context API.
 * This file defines the state structure, actions, reducer function, and context provider
 * that manages movie data, user preferences, and application state throughout the app.
 */

import React, { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  movies: [],
  trending: [],
  favorites: [],
  currentMovie: null,
  loading: false,
  error: null,
  searchQuery: '',
  darkMode: false,
  genres: [],
  filters: {
    genre: '',
    year: '',
    rating: ''
  },
  filteredMovies: []
};

// Action types
export const ACTIONS = {
  SET_MOVIES: 'SET_MOVIES',
  SET_TRENDING: 'SET_TRENDING',
  SET_CURRENT_MOVIE: 'SET_CURRENT_MOVIE',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_GENRES: 'SET_GENRES',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_FILTERED_MOVIES: 'SET_FILTERED_MOVIES'
};

// Reducer function
const movieReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MOVIES:
      return { ...state, movies: action.payload, loading: false };
    case ACTIONS.SET_TRENDING:
      return { ...state, trending: action.payload, loading: false };
    case ACTIONS.SET_CURRENT_MOVIE:
      return { ...state, currentMovie: action.payload, loading: false };
    case ACTIONS.ADD_TO_FAVORITES:
      // Avoid duplicates in favorites
      if (state.favorites.find(movie => movie.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case ACTIONS.REMOVE_FROM_FAVORITES:
      return { 
        ...state, 
        favorites: state.favorites.filter(movie => movie.id !== action.payload) 
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_SEARCH_QUERY:
      // Save to localStorage
      localStorage.setItem('lastSearchQuery', action.payload);
      return { ...state, searchQuery: action.payload };
    case ACTIONS.TOGGLE_DARK_MODE:
      const newMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return { ...state, darkMode: newMode };
    case ACTIONS.SET_GENRES:
      return { ...state, genres: action.payload };
    case ACTIONS.SET_FILTERS:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        loading: true
      };
    case ACTIONS.RESET_FILTERS:
      return { 
        ...state, 
        filters: { genre: '', year: '', rating: '' },
        filteredMovies: [] 
      };
    case ACTIONS.SET_FILTERED_MOVIES:
      return { ...state, filteredMovies: action.payload, loading: false };
    default:
      return state;
  }
};

// Create context
export const MovieContext = createContext();

// Provider component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    // Load favorites
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        favorites.forEach(movie => {
          dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: movie });
        });
      } catch (error) {
        console.error('Error loading favorites from localStorage', error);
      }
    }

    // Load last search query
    const lastSearchQuery = localStorage.getItem('lastSearchQuery');
    if (lastSearchQuery) {
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: lastSearchQuery });
    }
    
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      const isDarkMode = JSON.parse(darkMode);
      if (isDarkMode && !state.darkMode) {
        dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <MovieContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
