import React, { useState, useEffect } from 'react';

const Home = () => {
  //Feed aktueller Zustand; setFeed zum aktualisieren
  const [feed, setFeed] = useState(null);

  //https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  useEffect(() => {
    fetch('/api/rss')
      .then(response => response.text())
      .then(data => setFeed(data));
  }, []);

  return (
    <div>
      <pre>{feed}</pre>
    </div>
  );
};

export default Home;