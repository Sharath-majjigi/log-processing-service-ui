"use client";

import { useEffect, useState } from 'react';
import { getQueueStatus } from '../services/api';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [queueStatus, setQueueStatus] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const status = await getQueueStatus();
            setQueueStatus(status);
        };
        fetchData();
    }, []);

    return (
      <div className="home">
          <h1>Welcome to the Log Processor</h1>
          <p>Your one-stop solution for log management.</p>
          <img src="/funny.gif" alt="Funny GIF" className="gif" />
  
          <div className="linkedin">
              <p>Connect with me on LinkedIn:</p>
              <a href="https://www.linkedin.com/in/Sharath-majjigi" target="_blank" rel="noopener noreferrer">
                  <img src="/linkedin_logo.png" alt="LinkedIn Logo" className="linkedin-logo" height={30} width={30}/>
              </a>
          </div>
      </div>
  );
};

export default Home;