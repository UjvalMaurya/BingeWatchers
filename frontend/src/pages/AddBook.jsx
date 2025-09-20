import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";

export default function AddBook() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  const [form, setForm] = useState({
    title: "",
    author: "",
    pages: "",
    publisher: "",
    rating: "",
    review: "",
    language: "",
    cover: "", // <-- new field for image URL
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
        body: JSON.stringify({ ...form, type: "Book" }),
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Unauthorized! Please login again.");
        return navigate("/login");
      }

      if (res.ok) {
        toast.success("Book Added Successfully!", { autoClose: 2000 });
        setForm({
          title: "",
          author: "",
          pages: "",
          publisher: "",
          rating: "",
          review: "",
          language: "",
          poster: "",
          status: "Ongoing",
        });

        setTimeout(() => navigate("/view/book"), 2000);
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
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Add Book</h1>

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
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="number"
          name="pages"
          value={form.pages}
          onChange={handleChange}
          placeholder="Pages"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          name="publisher"
          value={form.publisher}
          onChange={handleChange}
          placeholder="Publisher"
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
        <input
          name="language"
          value={form.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
        name="poster"
        value={form.poster}
        onChange={handleChange}
        placeholder="Cover Image URL"
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
          Add Book
        </button>
      </form>
    </div>
  );
}
