import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import AddAnime from "./pages/AddAnime.jsx";
import AddWebSeries from "./pages/AddWebSeries.jsx";
import AddMovieSeries from "./pages/AddMovieSeries.jsx";
import AddAnimatedMovie from "./pages/AddAnimatedMovie.jsx";
import AddSingleMovie from "./pages/AddSingleMovie.jsx";
import AddBook from "./pages/AddBook.jsx";

import Books from "./pages/Books.jsx";
import Anime from "./pages/Anime.jsx";
import WebSeries from "./pages/WebSeries.jsx";
import MovieSeries from "./pages/MovieSeries.jsx";
import AnimatedMovie from "./pages/AnimatedMovie.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Layout for consistent structure
function Layout() {
  return (
    <>
      {/* Navbar can go here if needed */}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Add pages (protected)
      {
        path: "/add/anime",
        element: (
          <ProtectedRoute>
            <AddAnime />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add/webseries",
        element: (
          <ProtectedRoute>
            <AddWebSeries />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add/movieseries",
        element: (
          <ProtectedRoute>
            <AddMovieSeries />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add/animatedmovie",
        element: (
          <ProtectedRoute>
            <AddAnimatedMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add/singlemovie",
        element: (
          <ProtectedRoute>
            <AddSingleMovie />
          </ProtectedRoute>
        ),
      },

      {
  path: "/add/book",
  element: (
    <ProtectedRoute>
      <AddBook />
    </ProtectedRoute>
  ),
},
{
  path: "/view/book",
  element: (
    <ProtectedRoute>
      <Books />
    </ProtectedRoute>
  ),
},

      // View pages (protected)
      {
        path: "/view/anime",
        element: (
          <ProtectedRoute>
            <Anime />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view/webseries",
        element: (
          <ProtectedRoute>
            <WebSeries />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view/movieseries",
        element: (
          <ProtectedRoute>
            <MovieSeries />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view/animatedmovie",
        element: (
          <ProtectedRoute>
            <AnimatedMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view/singlemovie",
        element: (
          <ProtectedRoute>
            <SingleMovie />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
