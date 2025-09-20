import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

export default function AddAnime() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    poster: "",
    rating: "",
    review: "",
    status: "Ongoing",
    seasons: "",
    totalEpisodes: "",
    connections: { prequel: [], sequel: [], spinOff: [], sharedUniverse: [] },
  });

  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  if (!user) return <Navigate to="/login" />;

  // Fetch all content
  useEffect(() => {
    if (!token) return; // wait until token exists

    const fetchContent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          toast.error("Unauthorized! Please login again.");
          return navigate("/login");
        }

        const data = await res.json();
        setAllContent(Array.isArray(data) ? data : data.content || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [token, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleConnection = (field, id) => {
    setForm({
      ...form,
      connections: {
        ...form.connections,
        [field]: form.connections[field].includes(id)
          ? form.connections[field].filter((x) => x !== id)
          : [...form.connections[field], id],
      },
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You are not logged in!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, type: "Anime" }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Anime Added Successfully!", { autoClose: 2000 });
        setForm({
          title: "",
          poster: "",
          rating: "",
          review: "",
          status: "Ongoing",
          seasons: "",
          totalEpisodes: "",
          connections: { prequel: [], sequel: [], spinOff: [], sharedUniverse: [] },
        });

        setTimeout(() => navigate("/view/anime"), 2000);
      } else {
        toast.error("Error: " + (data.message || data.error));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer />
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Add Anime</h1>

      <form onSubmit={submit} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded bg-gray-700" required />
        <input name="poster" value={form.poster} onChange={handleChange} placeholder="Poster URL" className="w-full p-2 rounded bg-gray-700" />
        <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (0-10)" className="w-full p-2 rounded bg-gray-700" />
        <textarea name="review" value={form.review} onChange={handleChange} placeholder="Short Review" className="w-full p-2 rounded bg-gray-700" />
        <input type="number" name="seasons" value={form.seasons} onChange={handleChange} placeholder="Seasons" className="w-full p-2 rounded bg-gray-700" />
        <input type="number" name="totalEpisodes" value={form.totalEpisodes} onChange={handleChange} placeholder="Total Episodes" className="w-full p-2 rounded bg-gray-700" />
        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
          {["Ongoing", "Completed", "Hiatus"].map((s) => (<option key={s}>{s}</option>))}
        </select>

        {/* Connections */}
        <div>
          <p className="font-semibold mb-2">Connect to Other Shows</p>
          {["prequel", "sequel", "spinOff", "sharedUniverse"].map((field) => (
            <div key={field} className="mb-3">
              <label className="block mb-1 capitalize">{field}</label>
              <div className="flex flex-wrap gap-2">
                {allContent.filter(c => field === "prequel" || field === "sequel" ? c.type === "Anime" : true).map(c => (
                  <button
                    type="button"
                    key={c._id}
                    onClick={() => handleConnection(field, c._id)}
                    className={`px-2 py-1 rounded text-sm border ${form.connections[field].includes(c._id) ? "bg-green-600 border-green-600" : "border-gray-500"}`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded font-bold">
          Add Anime
        </button>
      </form>
    </div>
  );
}
