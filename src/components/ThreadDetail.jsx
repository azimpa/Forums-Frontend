// src/pages/ThreadDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetThreadByIdQuery, useGetResponsesQuery } from '../features/api';
import ResponseForm from '../components/ResponseForm';
import './ThreadDetail.css';

const ThreadDetail = () => {
  const { id } = useParams();
  const { data: thread, error: threadError, isLoading: threadLoading } = useGetThreadByIdQuery(id);
  const { data: responses, error: responsesError, isLoading: responsesLoading } = useGetResponsesQuery(id);

  if (threadLoading || responsesLoading) return <div>Loading...</div>;
  if (threadError) return <div>Error: {threadError.message}</div>;
  if (responsesError) return <div>Error loading responses: {responsesError.message}</div>;

  return (
    <div className="thread-detail">
      <h1>{thread.title}</h1>
      <div className="thread-info">
        <span>by {thread.user.username}</span>
        <span>Created: {new Date(thread.created_at).toLocaleString()}</span>
      </div>
      <div className="thread-body">{thread.body}</div>
      <div className="thread-tags">
        {thread.tags.map(tag => (
          <span key={tag.id} className="tag">{tag.name}</span>
        ))}
      </div>
      <h2>Responses</h2>
      <ul className="responses">
        {responses.map(response => (
          <li key={response.id}>
            <div className="response-info">
              <span>{response.user.username}</span>
              <span>{new Date(response.created_at).toLocaleString()}</span>
            </div>
            <div className="response-body">{response.body}</div>
          </li>
        ))}
      </ul>
      <ResponseForm threadId={id} />
    </div>
  );
};

export default ThreadDetail;