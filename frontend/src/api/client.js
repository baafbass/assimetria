import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getArticles = async () => {
  const response = await apiClient.get('/articles');
  return response.data;
};

export const getArticle = async (id) => {
  const response = await apiClient.get(`/articles/${id}`);
  return response.data;
};

export default apiClient;