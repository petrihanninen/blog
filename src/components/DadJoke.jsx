import React, { useState, useEffect } from 'react';

const DAD_JOKE_API = 'https://icanhazdadjoke.com/';

const DadJoke = () => {
  const [joke, setJoke] = useState('...');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DAD_JOKE_API, {
        headers: { Accept: 'text/plain' },
      });
      const result = await response.text();
      setJoke(result);
    };

    fetchData();
  }, []);

  return (
    <a
      href={`${DAD_JOKE_API}/api`}
      target="_blank"
      rel="noreferrer"
      className="blog-roll-item"
    >
      <h2 className="post-meta">A Random Joke for You</h2>
      <p>{joke}</p>
    </a>
  );
};

export default DadJoke;
