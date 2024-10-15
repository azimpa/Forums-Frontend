  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useCreateThreadMutation, useGetCategoriesQuery } from '../features/api';
  import { FaHeading, FaAlignLeft, FaFolder, FaTags } from 'react-icons/fa'; 
  import './CreateThread.css';

  const CreateThread = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [tags, setTags] = useState('');

    const navigate = useNavigate();
    const [createThread, { isLoading }] = useCreateThreadMutation();
    const { data: categories } = useGetCategoriesQuery();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await createThread({
          title,
          body,
          category_id: categoryId,
          tags: tags.split(',').map(tag => tag.trim()),
        }).unwrap();
        console.log(result, "Thread created successfully");
        navigate(`/thread/${result.id}`);
      } catch (err) {
        console.error('Failed to create thread:', err);
      }
    };

    return (
      <div className="create-thread">
        <h1>Create New Thread</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"><FaHeading /> Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body"><FaAlignLeft /> Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category"><FaFolder /> Category:</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories && categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tags"><FaTags /> Tags:</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Separate tags with commas"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Thread'}
          </button>
        </form>
      </div>
    );
  };

  export default CreateThread;