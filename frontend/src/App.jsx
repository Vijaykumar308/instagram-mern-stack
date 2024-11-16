import './App.css';
import Signup from './components/signup';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Profile from './components/Profile';

// Create the router configuration
const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Main layout for the dashboard pages
    children: [
      {
        path: '/', // Default path for the MainLayout, redirect to /home
        element: <Home />
      },
      {
        path: 'home', // /home route
        element: <Home />
      },
      {
        path: 'profile', // /profile route
        element: <Profile />
      }
    ]
  },
  {
    path: '/login', // Login page route
    element: <Login />
  },
  {
    path: '/signup', // Signup page route
    element: <Signup />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
