import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://127.0.0.1:8000/api/blogs/";

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts"], // ✅ Place ici et non dans baseQuery
  endpoints: (builder) => ({
    getBlogPosts: builder.query({
      query: () => "all_posts/", // Récupérer tous les posts
      providesTags: ["Posts"], // Associe les posts au tag
    }),
    createBlogPost: builder.mutation({
      query: (newPost) => ({
        url: "posts/", // Endpoint de création
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"], // Rafraîchit la liste après ajout
    }),
    deleteMyPost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like/`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useCreateBlogPostMutation,
  useDeleteMyPostMutation,
  useLikePostMutation,
} = blogApi;
export default blogApi;
