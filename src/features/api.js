import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const forumApi = createApi({
    reducerPath: 'forumApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}api/`,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Token ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Thread', 'Response', 'Category'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories/',
            providesTags: ['Category'],
        }),
        getThreads: builder.query({
            query: (categoryId) => categoryId ? `threads/?category=${categoryId}` : 'threads/',
            providesTags: ['Thread'],
        }),
        getThreadById: builder.query({
            query: (id) => `threads/${id}/`,
            providesTags: ['Thread'],
        }),
        createThread: builder.mutation({
            query: (newThread) => ({
                url: 'threads/',
                method: 'POST',
                body: newThread,
            }),
            invalidatesTags: ['Thread'],
        }),
        getResponses: builder.query({
            query: (threadId) => `responses/?thread=${threadId}`,
            providesTags: ['Response'],
        }),
        createResponse: builder.mutation({
            query: (newResponse) => ({
                url: 'responses/',
                method: 'POST',
                body: newResponse,
            }),
            invalidatesTags: ['Response'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetThreadsQuery,
    useGetThreadByIdQuery,
    useCreateThreadMutation,
    useGetResponsesQuery,
    useCreateResponseMutation,
} = forumApi;