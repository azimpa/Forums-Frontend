import React, { useState } from 'react';
import { useCreateResponseMutation } from '../features/api';
import './ResponseForm.css';

const ResponseForm = ({ threadId }) => {
  const [body, setBody] = useState('');
  const [createResponse, { isLoading }] = useCreateResponseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResponse({ threadId, body }).unwrap();
      setBody('');
    } catch (err) {
      console.error('Failed to create response:', err);
    }
  };

  return (
    <div className="response-form">
      <h3>Add a Response</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your response here..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Response'}
        </button>
      </form>
    </div>
  );
};

export default ResponseForm;