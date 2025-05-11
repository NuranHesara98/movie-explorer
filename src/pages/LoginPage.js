/**
 * @file LoginPage.js
 * @description Authentication page that allows users to sign in to the application.
 * This is the first page users see when accessing the app if not already authenticated.
 */

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Avatar,
  InputAdornment,
  IconButton,
  Fade,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useNavigate } from 'react-router-dom';
import { MovieContext, ACTIONS } from '../context/MovieContext';

/**
 * LoginPage Component - Provides user authentication functionality
 * @returns {JSX.Element} The LoginPage component
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  // Add animation effect when component mounts
  useEffect(() => {
    setFadeIn(true);
    
    // Check if there's an existing login session
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // In a real app, you would validate credentials with a backend
    // For this demo, we'll just accept any non-empty credentials
    localStorage.setItem('isLoggedIn', 'true');
    
    // Store username if remember me is checked
    if (rememberMe) {
      localStorage.setItem('rememberedUsername', username);
    } else {
      localStorage.removeItem('rememberedUsername');
    }
    
    navigate('/');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)',
        padding: 3
      }}
    >
      <Fade in={fadeIn} timeout={800}>
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              boxShadow: '0 24px 36px rgba(0,0,0,0.3)'
            }}
          >
            {/* Left side - Brand/Logo */}
            <Box
              sx={{
                flex: { md: '0 0 40%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main',
                color: 'white',
                padding: 4,
                backgroundImage: 'linear-gradient(135deg, #3498db 0%, #1976d2 100%)'
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  mb: 2,
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <LocalMoviesIcon sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Movie Explorer
              </Typography>
              <Typography variant="body1" textAlign="center" sx={{ opacity: 0.8 }}>
                Discover trending movies and find your next favorite film
              </Typography>
            </Box>

            {/* Right side - Login Form */}
            <Box
              sx={{
                flex: { md: '0 0 60%' },
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Please sign in to continue to your account
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                {error && (
                  <Typography 
                    color="error" 
                    variant="body2" 
                    sx={{ 
                      mt: 1, 
                      display: 'flex', 
                      alignItems: 'center',
                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      padding: '8px 12px',
                      borderRadius: 1,
                    }}
                  >
                    {error}
                  </Typography>
                )}

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)} 
                        color="primary" 
                        size="small"
                      />
                    }
                    label="Remember me"
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Sign In
                </Button>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
                  For demo purposes, any username and password will work
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
};

export default LoginPage;
