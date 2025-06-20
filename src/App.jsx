import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArtworks = () => {
    setLoading(true);
    fetch("https://api.artic.edu/api/v1/artworks?page=2&limit=30")
      .then((res) => res.json())
      .then((data) => {
        const artworksWithImages = data.data.filter((art) => art.image_id);
        setArtworks(artworksWithImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Automatically load artworks on first render
  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <div className="container">
      <h1>🎨 Masterpiece Gallery</h1>

      <div className="button-wrapper">
        <button onClick={fetchArtworks}>🔄 Load Artworks</button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading...</p>
      ) : (
        <div className="card-grid">
          {artworks.map((art) => (
            <div key={art.id} className="card">
              <img
                className="art-image"
                src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                alt={art.title}
              />
              <h2>{art.title}</h2>
              <p><strong>Artist:</strong> {art.artist_display || "Unknown"}</p>
              <p><strong>Date:</strong> {art.date_display || "N/A"}</p>
              <p><strong>Medium:</strong> {art.medium_display || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
