import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { getContentByType } from "../services/contentService.js";

export default function Books() {
  const { user, token } = useAuth();
  if (!user) return <Navigate to="/login" />;

  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getContentByType("Book", token);
        setBookList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [token]);

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Books</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Track all your books! Browse your list and explore ratings, reviews, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bookList.length > 0 ? (
            bookList.map((book) => (
            <ContentCard
            key={book._id}
            content={book}
            onDelete={(id) => setBookList(bookList.filter((b) => b._id !== id))}
        />
    ))
  ) : (
    <p className="text-gray-400 col-span-full text-center mt-20">
      You haven't added any books yet.
    </p>
  )}
</div>

    </div>
  );
}
