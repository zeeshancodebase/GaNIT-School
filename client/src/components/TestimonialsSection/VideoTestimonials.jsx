import React, { useEffect, useState } from "react";
const TESTIMONIAL_LINKS =
  "https://docs.google.com/spreadsheets/d/1e55OEYa_yX3Wu_ouattU3chJt33C6UGthM9xos-8Y4g/export?format=csv";

function convertToEmbedUrl(url) {
  try {
    // Handles links like:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    const youtubeWatch = "watch?v=";
    const shortYouTube = "youtu.be/";

    if (url.includes(youtubeWatch)) {
      const id = url.split(youtubeWatch)[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes(shortYouTube)) {
      const id = url.split(shortYouTube)[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // If it's already an embed or something else, just return as is
    return url;
  } catch {
    return url;
  }
}

const VideoTestimonials = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(TESTIMONIAL_LINKS);
        const text = await res.text();

        // Simple CSV parsing
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());

        const idIndex = headers.indexOf("id");
        const titleIndex = headers.indexOf("title");
        const urlIndex = headers.indexOf("url");

        const data = lines.slice(1).map((line) => {
          // Handle commas inside quotes roughly (very basic CSV parsing)
          const parts = line
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            .map((p) => p.replace(/^"|"$/g, "").trim());

          return {
            id: parts[idIndex] || Date.now() + Math.random(),
            title: parts[titleIndex] || "Video",
            url: convertToEmbedUrl(parts[urlIndex] || ""),
          };
        });

        setVideos(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load videos. Check the sheet URL & permissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="tracks-title-container">
          <h2 className="courses-tracks-title">
            Video <span className="highlight">Testimonials</span>
          </h2>
        </div>

        {loading && <p>Loading videos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && videos.length === 0 && (
          //   <p>No videos found. Add some rows in your Google Sheet.</p>
          <p>No videos found. Add some rows in your ....</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video) => (
            <div key={video.id}>
              <h4 style={{ marginBottom: "10px", color: "var(--text-muted)" }}>
                {video.title}
              </h4>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={video.url}
                  title={video.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <a
                className="btn primary"
                href="https://youtube.com/shorts/SeC-Ep3F5Ao?si=QR_d5hslercBGL5s"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;
