import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Grid, Box, CircularProgress, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../services/api';
import { MovieContext, ACTIONS } from '../context/MovieContext';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { movies, loading, error, dispatch } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Reset when query changes
    if (query) {
      setPage(1);
      fetchMovies(query, 1, true);
    }
  }, [query, dispatch]);

  const fetchMovies = async (searchQuery, pageNum, resetResults = false) => {
    if (resetResults) {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    } else {
      setIsLoadingMore(true);
    }

    try {
      const response = await searchMovies(searchQuery, pageNum);
      const newMovies = response.data.results;
      setTotalPages(response.data.total_pages);

      if (resetResults) {
        dispatch({ type: ACTIONS.SET_MOVIES, payload: newMovies });
      } else {
        dispatch({ type: ACTIONS.SET_MOVIES, payload: [...movies, ...newMovies] });
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Failed to search movies. Please try again later.'
      });
    } finally {
      if (resetResults) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  if (!query) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <SearchBar />
        <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
          Please enter a search term to find movies.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <SearchBar />

      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ mt: 4, mb: 3 }}
      >
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : movies.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          No movies found for "{query}". Try a different search term.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                onClick={handleLoadMore} 
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResultsPage;
