import React, { useEffect, useContext } from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { MovieContext, ACTIONS } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { getTrendingMovies } from '../services/api';

const HomePage = () => {
  const { trending, loading, error, dispatch } = useContext(MovieContext);

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
        Trending Movies
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {trending.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
