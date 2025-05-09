import React, { useState, useContext, useEffect } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieContext, ACTIONS } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { searchQuery, dispatch } = useContext(MovieContext);
  const [localQuery, setLocalQuery] = useState('');
  const navigate = useNavigate();

  // Update local state when context changes (e.g., on initial load from localStorage)
  useEffect(() => {
    if (searchQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: localQuery });
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 20,
          boxShadow: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for movies..."
          inputProps={{ 'aria-label': 'search movies' }}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
