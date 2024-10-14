import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../features/api';
import { FaFolder } from 'react-icons/fa';
import './CategoryList.css';

const CategoryList = () => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="category-list">
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>
                            <FaFolder className="category-icon" />
                            <h2>{category.title}</h2>
                            <p>{category.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;