/**
 * @file MovieCard.js
 * @description Reusable card component that displays movie information including
 * poster image, title, release year, and rating. Also handles adding/removing
 * movies from favorites and navigation to the movie details page.
 */

import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Rating, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieContext, ACTIONS } from '../context/MovieContext';
import { getImageUrl } from '../services/api';

/**
 * MovieCard Component - Displays a single movie in a card format
 * @param {Object} props - Component props
 * @param {Object} props.movie - Movie data object containing details like id, title, poster_path, etc.
 */
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, dispatch } = useContext(MovieContext);

  // Check if this movie is in the user's favorites list
  const isInFavorites = favorites.some((favMovie) => favMovie.id === movie.id);

  /**
   * Navigate to the movie details page when the card is clicked
   */
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  /**
   * Toggle the movie's favorite status
   * @param {Event} e - The click event
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking the favorite button
    if (isInFavorites) {
      dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: movie.id });
    } else {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: movie });
    }
  };

  // Get release year from date
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <Card 
      sx={{ 
        width: '240px',
        height: '450px', // Fixed height for all cards
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        },
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="320"
        image={getImageUrl(movie.poster_path) || '/placeholder-image.jpg'}
        alt={movie.title}
        sx={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
        }}
      >
        <IconButton onClick={handleFavoriteClick} color="secondary">
          {isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1, height: '100px', overflow: 'hidden' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          {releaseYear && (
            <Chip label={releaseYear} size="small" variant="outlined" />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating 
              value={movie.vote_average / 2} 
              precision={0.5} 
              size="small" 
              readOnly 
            />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
