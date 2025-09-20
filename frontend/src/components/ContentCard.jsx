import { toast } from "react-toastify";

export default function ContentCard({ content, onDelete }) {
  const defaultImage =
    "https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg";


  return (
    <div className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-gray-800">
      {/* Poster */}
      <img
        src={content.poster || defaultImage}
        alt={content.title}
        className="w-full h-72 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
      />

      {/* Overlay info */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        <h2 className="text-xl font-bold mb-2">{content.title}</h2>
        {/* badges, genres, etc. */}
      </div>
    </div>
  );
}
