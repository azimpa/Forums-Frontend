import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../features/api';
import { FaFolder } from 'react-icons/fa';
import './CategoryList.css';
import Navigation from './Navigation';

const CategoryList = () => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="page-container">
            <Navigation />
            <div className="category-list">
                <header>
                    <h1>Categories</h1>
                </header>
                <main>
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
                </main>
                <footer>
                    <p>&copy; 2023 Our Forum. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default CategoryList;