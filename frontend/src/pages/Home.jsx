import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilm, FaTv, FaPlayCircle, FaRegLaughBeam, FaStar, FaBook } from "react-icons/fa";


export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Sections with better naming and icons
  const sections = [
  { key: "anime", label: "Anime", icon: <FaTv size={24} /> },
  { key: "webseries", label: "Web Series", icon: <FaPlayCircle size={24} /> },
  { key: "movieseries", label: "Movie Series", icon: <FaFilm size={24} /> },
  { key: "animatedmovie", label: "Animated Movies", icon: <FaRegLaughBeam size={24} /> },
  { key: "singlemovie", label: "Single Movies", icon: <FaStar size={24} /> },
  { key: "book", label: "Books", icon: <FaBook size={24} /> }, // Add this


  ];

  // Handle redirect with toast if user not logged in
  const handleRedirect = (path) => {
    if (!user) {
      toast.warning("You must be logged in to access this page!", { autoClose: 2000 });
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <ToastContainer />

      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md sticky top-0 z-50 w-full rounded-b-xl">
        <div className="flex gap-6">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => handleRedirect(`/add/${s.key}`)}
              className="flex items-center gap-1 hover:text-blue-400 font-semibold transition-colors duration-300"
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {user.username.length > 12
                  ? user.username.slice(0, 12) + "..."
                  : user.username}
              </span>
              <button
                onClick={() => { logout(); toast.success("Logged out successfully!"); }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleRedirect("/login")}
                className="hover:text-blue-400 font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => handleRedirect("/register")}
                className="hover:text-blue-400 font-semibold"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Intro Section */}
      <div className="flex flex-col items-center justify-center mt-16 text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight">Welcome to Watchlist GraveWard</h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Discover your next favorite show or movie! Browse Anime, Web Series, Movie Series, Animated Movies, and Single Movies.
          Track what you've watched, explore connections, and never miss a sequel or spin-off.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => handleRedirect(`/view/${s.key}`)}
            className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-6 rounded-3xl text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105"
          >
            <span className="mb-2">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
