import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaFilm,
  FaTv,
  FaPlayCircle,
  FaRegLaughBeam,
  FaStar,
  FaBook,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const sections = [
    { key: "anime", label: "Anime", icon: <FaTv size={24} /> },
    { key: "webseries", label: "Web Series", icon: <FaPlayCircle size={24} /> },
    { key: "movieseries", label: "Movie Series", icon: <FaFilm size={24} /> },
    { key: "animatedmovie", label: "Animated Movies", icon: <FaRegLaughBeam size={24} /> },
    { key: "singlemovie", label: "Single Movies", icon: <FaStar size={24} /> },
    { key: "book", label: "Books", icon: <FaBook size={24} /> },
  ];

  const handleRedirect = (path) => {
    if (!user) {
      toast.warning("You must be logged in to access this page!", {
        autoClose: 2000,
      });
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <ToastContainer />

      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex flex-wrap justify-center sm:justify-between gap-3 items-center shadow-md sticky top-0 z-50 w-full rounded-b-xl">
        <div className="flex flex-wrap gap-3 justify-center">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => handleRedirect(`/add/${s.key}`)}
              className="flex items-center gap-1 hover:text-blue-400 font-semibold transition-colors duration-300 text-sm sm:text-base"
            >
              {s.icon} {`Add ${s.label}`}
            </button>
          ))}
        </div>

        <div className="flex gap-3 items-center mt-3 sm:mt-0">
          {user ? (
            <>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {user.username.length > 12
                  ? user.username.slice(0, 12) + "..."
                  : user.username}
              </span>
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully!");
                }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleRedirect("/login")}
                className="hover:text-blue-400 font-semibold text-sm"
              >
                Login
              </button>
              <button
                onClick={() => handleRedirect("/register")}
                className="hover:text-blue-400 font-semibold text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Intro Section */}
      <div className="flex flex-col items-center justify-center mt-16 text-center space-y-6 max-w-3xl px-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Welcome to Watchlist GraveWard
        </h1>
        <p className="text-base sm:text-xl text-gray-300">
          Discover your next favorite show or movie! Browse Anime, Web Series,
          Movie Series, Animated Movies, and Single Movies. Track what you've
          watched, explore connections, and never miss a sequel or spin-off.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => handleRedirect(`/view/${s.key}`)}
            className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 sm:px-6 py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105"
          >
            <span className="mb-2">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
