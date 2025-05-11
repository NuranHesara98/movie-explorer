# Movie Explorer App

A feature-rich web application for browsing, searching, and discovering movies using The Movie Database (TMDb) API. This project allows users to explore trending movies, search for specific titles, filter by genre/year/rating, view detailed information, and maintain a list of favorite movies.

## 🎬 Features

### Core Features
- **User Authentication**: Login interface with username and password
- **Trending Movies**: Homepage showcasing popular movies from TMDb
- **Movie Search**: Search functionality to find movies by title
- **Movie Details**: Comprehensive view of each movie including:
  - Overview, genres, release date, rating
  - Cast information with photos
  - Trailer links
- **Favorites System**: Add/remove movies to a personalized favorites list

### Advanced Features
- **Dark/Light Theme**: Toggle between display modes for better user experience
- **Responsive Design**: Mobile-first approach ensures proper display on all devices
- **Movie Filtering**: Filter movies by:
  - Genre (Action, Drama, Comedy, etc.)
  - Release year
  - Rating (1-10 scale)
- **Local Storage**: Persistent storage for user preferences and favorites
- **Error Handling**: User-friendly messages for API errors

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (Create React App)
- **UI Library**: Material-UI (MUI) for modern, responsive components
- **State Management**: React Context API for global state management
- **API Communication**: Axios for HTTP requests
- **Routing**: React Router for navigation between pages
- **Styling**: CSS-in-JS using MUI's styling solution

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- TMDb API key (get one at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NuranHesara98/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the project root and add your TMDb API key:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🔍 API Usage

This project uses The Movie Database (TMDb) API v3. The main endpoints used are:

- `/trending/movie/{time_window}` - Get trending movies
- `/search/movie` - Search for movies by title
- `/movie/{movie_id}` - Get detailed movie information
- `/genre/movie/list` - Get list of movie genres
- `/discover/movie` - Get movies with specified filters

API calls are centralized in the `src/services/api.js` file for better maintainability.



## 🌟 Usage

- **Browse Movies**: The homepage displays trending movies upon loading
- **Search**: Use the search bar to find movies by title
- **Filtering**: Click the filter button to filter movies by genre, year, or rating
- **View Details**: Click on any movie card to see detailed information
- **Favorites**: Click the heart icon to add/remove movies from favorites
- **Theme Toggle**: Use the switch in the navbar to toggle between light/dark modes
