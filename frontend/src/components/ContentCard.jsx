import { toast } from "react-toastify";

export default function ContentCard({ content, onDelete }) {
  const defaultImage =
    "https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg";

  const handleDelete = () => {
    if (onDelete) {
      onDelete(content._id);
      toast.success(`${content.title} deleted successfully!`);
    }
  };

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
        <h2 className="text-xl font-bold mb-1">{content.title}</h2>

        {/* Rating & Status */}
        <div className="flex items-center justify-between mb-1 text-sm text-gray-300">
          <span>⭐ {content.rating || "N/A"}/10</span>
          <span className={`px-2 py-1 rounded-full text-xs ${content.status === "Ongoing" ? "bg-green-500" : content.status === "Completed" ? "bg-blue-500" : "bg-yellow-500"}`}>
            {content.status}
          </span>
        </div>

       

        {/* Seasons & Episodes */}
        {content.seasons && content.totalEpisodes && (
          <p className="text-gray-400 text-xs">
            {content.seasons} Season(s), {content.totalEpisodes} Episode(s)
          </p>
        )}


        
      </div>
    </div>
  );
}
