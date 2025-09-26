import { useState, useRef, useEffect } from "react";

export default function ContentCard({ content }) {
  const defaultImage =
    "https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg";

  const [overlayVisible, setOverlayVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!overlayVisible) return;
    const onPointerDown = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOverlayVisible(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [overlayVisible]);

  const toggleOverlay = () => setOverlayVisible((v) => !v);

  const overlayClasses = `absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-300 p-4 flex flex-col justify-end
    ${overlayVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    group-hover:opacity-100 group-hover:pointer-events-auto`;

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-gray-800"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleOverlay();
      }}
      aria-expanded={overlayVisible}
    >
      {/* Image tap/click opens overlay on mobile */}
      <div onClick={toggleOverlay} className="w-full">
        <img
          src={content.poster || defaultImage}
          alt={content.title}
          className="w-full h-64 sm:h-72 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
        />
      </div>

      {/* Info Overlay */}
      <div className={overlayClasses}>
        <h2 className="text-lg sm:text-xl font-bold mb-1 text-white">
          {content.title}
        </h2>

        <div className="flex items-center justify-between mb-1 text-xs sm:text-sm text-gray-300">
          <span>⭐ {content.rating || "N/A"}/10</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              content.status === "Ongoing"
                ? "bg-green-500"
                : content.status === "Completed"
                ? "bg-blue-500"
                : "bg-yellow-500"
            }`}
          >
            {content.status}
          </span>
        </div>

        {content.seasons && content.totalEpisodes && (
          <p className="text-gray-400 text-xs">
            {content.seasons} Season(s), {content.totalEpisodes} Episode(s)
          </p>
        )}

        {/* ✅ Connected Content */}
        {content.connections && (
          <div className="mt-2 space-y-1">
            {["prequel", "sequel", "spinOff", "sharedUniverse"].map((key) =>
              content.connections[key]?.length ? (
                <div key={key}>
                  <h3 className="text-xs text-gray-300 capitalize">
                    {key === "spinOff"
                      ? "Spin-Off"
                      : key === "sharedUniverse"
                      ? "Shared Universe"
                      : key}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {content.connections[key].map((c) => (
                      <span
                        key={c._id}
                        className="text-[11px] bg-gray-700 px-2 py-1 rounded text-white"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Close button → only visible on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOverlayVisible(false);
          }}
          className="mt-3 text-sm text-gray-300 underline sm:hidden"
        >
          Close
        </button>
      </div>
    </div>
  );
}
