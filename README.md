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

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── MovieCard.js  # Individual movie display card
│   ├── MovieFilter.js # Filter UI for movies
│   ├── Navbar.js     # Top navigation bar
│   ├── SearchBar.js  # Search functionality
│   └── ...
├── context/         # Global state management
│   ├── MovieContext.js # Movie data and favorites
│   └── ThemeContext.js # Light/dark mode preferences
├── pages/           # Page components
│   ├── HomePage.js     # Landing page with trending movies
│   ├── MovieDetailsPage.js # Detailed movie view
│   ├── FavoritesPage.js   # User's favorite movies
│   └── ...
├── services/        # External services
│   └── api.js       # TMDb API integration
└── App.js          # Main app component and routing
```

## 🌟 Usage

- **Browse Movies**: The homepage displays trending movies upon loading
- **Search**: Use the search bar to find movies by title
- **Filtering**: Click the filter button to filter movies by genre, year, or rating
- **View Details**: Click on any movie card to see detailed information
- **Favorites**: Click the heart icon to add/remove movies from favorites
- **Theme Toggle**: Use the switch in the navbar to toggle between light/dark modes

## 🔮 Future Enhancements

- User registration and profile management
- Movie recommendations based on viewing history
- Social sharing features
- Advanced filtering options (cast, director, etc.)
- TV show support

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the component library
- [Create React App](https://create-react-app.dev/) for the project setup
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
