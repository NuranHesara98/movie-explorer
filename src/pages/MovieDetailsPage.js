import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button, Chip, CircularProgress, Paper, Rating, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieContext, ACTIONS } from '../context/MovieContext';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentMovie, favorites, dispatch } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const isInFavorites = favorites.some((movie) => movie.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await getMovieDetails(id);
        dispatch({ type: ACTIONS.SET_CURRENT_MOVIE, payload: response.data });
        
        // Find trailer
        const videos = response.data.videos?.results || [];
        const trailer = videos.find(video => 
          video.type === 'Trailer' && video.site === 'YouTube'
        ) || videos[0];
        
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: parseInt(id) });
    } else if (currentMovie) {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: currentMovie });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currentMovie) {
    return (
      <Container>
        <Typography color="error" variant="h5" sx={{ mt: 4 }}>
          {error || 'Movie not found'}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    genres,
    runtime,
    credits,
  } = currentMovie;

  // Format release date
  const formattedReleaseDate = release_date 
    ? new Date(release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown';

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <Box>
      {/* Backdrop Image */}
      <Box 
        sx={{
          height: { xs: '300px', md: '500px' },
          position: 'relative',
          backgroundImage: `url(${getImageUrl(backdrop_path, 'original')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <Container
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            pt: 4,
          }}
        >
          {/* Back Button */}
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack} 
            variant="outlined"
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16, 
              color: 'white', 
              borderColor: 'white',
            }}
          >
            Back
          </Button>
          
          {/* Poster */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '300px',
              height: '450px',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <img 
              src={getImageUrl(poster_path) || '/placeholder-image.jpg'} 
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </Box>
          
          {/* Movie Info */}
          <Box
            sx={{
              ml: { md: 4 },
              color: 'white',
              flexGrow: 1,
              maxWidth: { md: 'calc(100% - 340px)' },
              mt: { xs: 10, md: 0 },
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
              <Rating 
                value={vote_average / 2} 
                precision={0.5} 
                readOnly 
                sx={{ mr: 1 }}
              />
              <Typography variant="body1" sx={{ mr: 2 }}>
                {vote_average ? `${vote_average.toFixed(1)}/10` : 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {formattedReleaseDate}
              </Typography>
              <Typography variant="body1">
                {formatRuntime(runtime)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {genres?.map((genre) => (
                <Chip 
                  key={genre.id} 
                  label={genre.name} 
                  size="small" 
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                />
              ))}
            </Box>
            
            <Typography variant="body1" paragraph>
              {overview}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {trailerKey && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<PlayArrowIcon />}
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                >
                  Watch Trailer
                </Button>
              )}
              
              <Button
                variant="outlined"
                color="secondary"
                startIcon={isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={handleToggleFavorite}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Cast Section */}
      <Container sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cast
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {cast.length > 0 ? (
            cast.map((person) => (
              <Grid item key={person.id} xs={6} sm={4} md={3} lg={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '160px' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <Box sx={{ width: '160px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', bgcolor: 'rgba(0,0,0,0.1)' }}>
                      <img 
                        src={getImageUrl(person.profile_path) || '/placeholder-person.jpg'} 
                        alt={person.name}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top'
                        }} 
                      />
                    </Box>
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" noWrap title={person.name} sx={{ fontWeight: 'bold' }}>
                        {person.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {person.character}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ pl: 2 }}>
              No cast information available.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetailsPage;
