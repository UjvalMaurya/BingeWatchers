import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

export default function AddSingleMovie() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" />;

  const [form, setForm] = useState({
    title: "",
    poster: "",
    rating: "",
    review: "",
    status: "Ongoing",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You are not logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, type: "Single Movie" }),
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Unauthorized! Please login again.");
        return navigate("/login");
      }

      if (res.ok) {
        toast.success("Single Movie Added Successfully!", { autoClose: 2000 });
        setForm({
          title: "",
          poster: "",
          rating: "",
          review: "",
          status: "Ongoing",
        });

        setTimeout(() => navigate("/view/singlemovie"), 2000);
      } else {
        toast.error("Error: " + (data.message || data.error));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />

      {/* Back to Home */}
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Add Single Movie</h1>

      <form
        onSubmit={submit}
        className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl space-y-4"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <input
          name="poster"
          value={form.poster}
          onChange={handleChange}
          placeholder="Poster URL"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0-10)"
          className="w-full p-2 rounded bg-gray-700"
        />
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="Short Review"
          className="w-full p-2 rounded bg-gray-700"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        >
          {["Ongoing", "Completed", "Hiatus"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded font-bold"
        >
          Add Single Movie
        </button>
      </form>
    </div>
  );
}
