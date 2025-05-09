import React, { useContext } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider', pb: 1 }}
      >
        My Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            You haven't added any movies to your favorites yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleExploreClick}
            sx={{ mt: 2 }}
          >
            Explore Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
