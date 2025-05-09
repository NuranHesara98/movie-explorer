import React, { useContext, useEffect, useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Slider,
  Button,
  Chip,
  Grid
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MovieContext, ACTIONS } from '../context/MovieContext';
import { getGenres, getMoviesByFilters } from '../services/api';

const MovieFilter = () => {
  const { genres, filters, dispatch } = useContext(MovieContext);
  const [expanded, setExpanded] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    genre: '',
    year: '',
    rating: 0
  });

  // Generate year options from 1980 to current year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1980; year--) {
      years.push(year);
    }
    setYearOptions(years);
  }, []);

  // Fetch genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        dispatch({ type: ACTIONS.SET_GENRES, payload: response.data.genres });
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    if (genres.length === 0) {
      fetchGenres();
    }
  }, [dispatch, genres.length]);

  // Initialize local filters from context
  useEffect(() => {
    setLocalFilters({
      genre: filters.genre || '',
      year: filters.year || '',
      rating: filters.rating || 0
    });
  }, [filters]);

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = async () => {
    // Only include non-empty/non-zero filters
    const filtersToApply = {};
    if (localFilters.genre) filtersToApply.genre = localFilters.genre;
    if (localFilters.year) filtersToApply.year = localFilters.year;
    if (localFilters.rating > 0) filtersToApply.rating = localFilters.rating;

    // Update filters in context
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filtersToApply });

    // Fetch filtered movies
    try {
      const response = await getMoviesByFilters(filtersToApply);
      dispatch({ type: ACTIONS.SET_FILTERED_MOVIES, payload: response.data.results });
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to fetch filtered movies. Please try again.' 
      });
    }
  };

  const handleReset = () => {
    setLocalFilters({
      genre: '',
      year: '',
      rating: 0
    });
    dispatch({ type: ACTIONS.RESET_FILTERS });
  };

  // Count active filters
  const activeFilterCount = Object.values(localFilters).filter(value => value && value !== 0).length;

  return (
    <Box sx={{ mb: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          p: 2,
          mb: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon 
            sx={{ 
              mr: 1.5, 
              color: 'primary.main',
              fontSize: 28,
              animation: expanded ? 'pulse 1.5s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { opacity: 0.7 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.7 }
              }
            }} 
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Filter Movies</Typography>
          {activeFilterCount > 0 && (
            <Chip 
              label={activeFilterCount} 
              color="primary" 
              size="small" 
              sx={{ 
                ml: 1.5, 
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            />
          )}
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center', 
            color: 'primary.main',
            fontWeight: 500,
            '& svg': {
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }
          }}
        >
          <Typography color="primary" sx={{ mr: 0.5, fontWeight: 'medium' }}>
            {expanded ? 'Hide Filters' : 'Show Filters'}
          </Typography>
          <Box 
            component="span" 
            sx={{ 
              fontSize: 20, 
              transition: 'transform 0.3s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0)'
            }}
          >
            ▾
          </Box>
        </Box>
      </Box>
      
      {expanded && (
        <Box 
          sx={{ 
            py: 3,
            px: 2, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.4s ease',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                  labelId="genre-select-label"
                  id="genre-select"
                  value={localFilters.genre}
                  label="Genre"
                  onChange={(e) => handleChange('genre', e.target.value)}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme => theme.palette.primary.light,
                      opacity: 0.5,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      opacity: 0.8,
                    },
                  }}
                >
                  <MenuItem value="" sx={{ fontStyle: 'italic' }}>All Genres</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="year-select-label">Release Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={localFilters.year}
                  label="Release Year"
                  onChange={(e) => handleChange('year', e.target.value)}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme => theme.palette.primary.light,
                      opacity: 0.5,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      opacity: 0.8,
                    },
                  }}
                >
                  <MenuItem value="" sx={{ fontStyle: 'italic' }}>All Years</MenuItem>
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ width: '100%', px: 2 }}>
                <Typography 
                  id="rating-slider" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'medium',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <span>Minimum Rating:</span>
                  <Chip 
                    label={localFilters.rating > 0 ? `${localFilters.rating.toFixed(1)}/10` : 'Any'} 
                    size="small" 
                    color={localFilters.rating > 0 ? "primary" : "default"}
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Slider
                  aria-labelledby="rating-slider"
                  value={localFilters.rating}
                  onChange={(e, newValue) => handleChange('rating', newValue)}
                  step={0.5}
                  marks
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                  sx={{
                    '& .MuiSlider-thumb': {
                      width: 16,
                      height: 16,
                      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                      '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                      },
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgb(25 118 210 / 16%)'
                      },
                      '&.Mui-active': {
                        width: 20,
                        height: 20,
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.5,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mt: 4, 
              gap: 2 
            }}
          >
            <Button 
              variant="outlined" 
              onClick={handleReset}
              sx={{ 
                px: 3,
                py: 1,
                borderRadius: 2,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.04)'
                }
              }}
            >
              Reset Filters
            </Button>
            <Button 
              variant="contained" 
              onClick={handleApplyFilters}
              sx={{ 
                px: 4,
                py: 1,
                borderRadius: 2,
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieFilter;
