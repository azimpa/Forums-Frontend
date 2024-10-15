import React from 'react';
import { Link } from 'react-router-dom';
import { useGetThreadsQuery } from '../features/api';
import './Home.css';
import Navigation from './Navigation';

const Home = () => {
  const { data: threads, error, isLoading } = useGetThreadsQuery();
  console.log(threads, "oooo")

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="page-container">
      <Navigation />
      <div className="home">
        <header>
          <h1>Welcome to Our Forum</h1>
        </header>
        <main>
          <section className="latest-threads">
            <h2>Latest Threads</h2>
            <div className="home-thread-list">
              {threads.slice(0, 5).map(thread => (
                <li key={thread.id}>
                  <Link to={`/thread/${thread.id}`}>
                    <h3>{thread.title}</h3>
                    <span className="thread-info">
                      by {thread.user.username} in {thread.category.title}
                    </span>
                  </Link>
                </li>
              ))}
            </div>
          </section>
        </main>
        <footer>
          <p>&copy; 2023 Our Forum. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;