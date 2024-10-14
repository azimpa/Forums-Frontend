import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetThreadsQuery } from '../features/api';
import './ThreadList.css';

const ThreadList = () => {
  const { id: categoryId } = useParams();
  const { data: threads, error, isLoading } = useGetThreadsQuery(categoryId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="thread-list">
      <h1>Threads in Category</h1>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>
            <Link to={`/thread/${thread.id}`}>
              <h2>{thread.title}</h2>
              <span className="thread-info">
                by {thread.user.username} | {new Date(thread.created_at).toLocaleString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create-thread" className="create-thread-button">Create New Thread</Link>
    </div>
  );
};

export default ThreadList;