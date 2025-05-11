/**
 * @file HomePage.js
 * @description Main landing page of the application that displays trending movies
 * and provides search and filtering functionality. This component fetches trending
 * movies on mount and displays either trending or filtered movies based on user
 * selection.
 */

import React, { useEffect, useContext } from 'react';
import { Container, Typography, Grid, Box, CircularProgress, Button } from '@mui/material';
import { MovieContext, ACTIONS } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieFilter from '../components/MovieFilter';
import { getTrendingMovies } from '../services/api';

const HomePage = () => {
  const { trending, filteredMovies, filters, loading, error, dispatch } = useContext(MovieContext);
  
  // Determine which movie list to display
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '' && filter !== 0);
  const displayMovies = hasActiveFilters ? filteredMovies : trending;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const response = await getTrendingMovies();
        dispatch({ type: ACTIONS.SET_TRENDING, payload: response.data.results });
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        dispatch({ 
          type: ACTIONS.SET_ERROR, 
          payload: 'Failed to fetch trending movies. Please try again later.' 
        });
      }
    };

    fetchTrendingMovies();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            mb: 2,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Movie Explorer
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          align="center"
          color="textSecondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Discover trending movies and find your next favorite film
        </Typography>
        <SearchBar />
      </Box>

      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider', pb: 1 }}
      >
        {hasActiveFilters ? 'Filtered Movies' : 'Trending Movies'}
      </Typography>
      
      {/* Movie Filter Component */}
      <MovieFilter />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {displayMovies.length > 0 ? (
            displayMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '240px', maxWidth: '100%' }}>
                    <MovieCard movie={movie} />
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', py: 5, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                {hasActiveFilters ? 'No movies match your filters. Try adjusting your criteria.' : 'No movies found.'}
              </Typography>
              {hasActiveFilters && (
                <Button 
                  variant="outlined" 
                  onClick={() => dispatch({ type: ACTIONS.RESET_FILTERS })}
                  sx={{ mt: 2 }}
                >
                  Clear Filters
                </Button>
              )}
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
