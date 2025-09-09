import React, { useState, useEffect } from "react";

function TrendingPage() {
  const [urls, setUrls] = useState([]);

  const handleNewQuote = async () => {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD53iNTGRZUPihELwvOflUeSFoN0o2SZJI&part=id,player&chart=mostPopular&maxResults=10&videoCategoryId=17"
    );
    const data = await response.json();

    const extracted = data.items.map((value) => {
      const parts = value.player.embedHtml.split(" ");
      const src = parts.find((p) => p.startsWith("src="));

      if (src) {
        let url = src.slice(5, -1);
        if (url.startsWith("//")) {
          url = "https:" + url;
        }
        return url;
      }
      return null;
    }).filter(Boolean);

    setUrls(extracted);
  };

  useEffect(() => {
    handleNewQuote();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1e2225', 
      color: 'white', 
      padding: '20px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '10px',
            background: 'linear-gradient(135deg, rgba(17,183,122,.856) 0%, #4ade80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔥 Trending Workouts
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
            Discover the most popular workouts this week
          </p>
        </header>
      </div>

      <div className="mainboard">
      <div className="youtube" id="video">
        {urls.map((link, index) => (
          <div key={index}>
            <iframe
              width="640"
              height="480"
              src={link}
              title={`video-${index}`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default TrendingPage;
