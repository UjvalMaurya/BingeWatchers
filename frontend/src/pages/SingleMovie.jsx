import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard.jsx";
import { getContentByType } from "../services/contentService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";


export default function SingleMovie() {
  const { user,token } = useAuth();
  if (!user) return <Navigate to="/login" />;
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getContentByType("Single Movie",token);
        setMovieList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [token]);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-8">
      {/* Back to Home Link */}
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Single Movie</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Track all the single movies you've watched! Browse your list and explore ratings, reviews, and more.
        </p>
      </div>

      {/* Single Movie Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <ContentCard key={movie._id} content={movie} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center mt-20">
            You haven't watched any single movies yet.
          </p>
        )}
      </div>
    </div>
  );
}
