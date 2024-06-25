import axios from "axios";

export const postsApi = axios.create({
  baseURL: import.meta.env.VITE_POSTS_API_URL,
  timeout: 5_000,
  maxBodyLength: 500_000,
  maxContentLength: 500_000,
});

export const commentsApi = axios.create({
  baseURL: import.meta.env.VITE_COMMENTS_API_URL,
  timeout: 5_000,
  maxBodyLength: 500_000,
  maxContentLength: 500_000,
});

