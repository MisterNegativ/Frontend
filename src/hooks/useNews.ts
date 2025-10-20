import { useState, useEffect } from 'react';
import { useStorage } from './useStorage';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
  content?: string;
}

export const useNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('general');

  const { getItem, setItem } = useStorage();
  const categories = ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  useEffect(() => {
    loadFavorites();
    loadNews();
  }, []);

  const loadFavorites = async () => {
    const favs = await getItem('favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  };

  const saveFavorites = async (favs: Article[]) => {
    await setItem('favorites', JSON.stringify(favs));
  };

  const loadNews = async (page = 1, newSearch = search, newCategory = category) => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = '0a2c733937054ad8a44d13139ae13483'; // Ваш API ключ
      const baseUrl = newSearch ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';
      
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        apiKey: API_KEY,
      });

      if (newSearch) {
        params.append('q', newSearch);
      } else {
        params.append('country', 'us');
        if (newCategory !== 'all') {
          params.append('category', newCategory);
        }
      }

      console.log('Fetching news from:', `${baseUrl}?${params}`);

      const response = await fetch(`${baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API error');
      }
      
      console.log('News loaded:', data.articles.length, 'articles');
      setArticles(page === 1 ? data.articles : [...articles, ...data.articles]);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load news';
      setError(errorMessage);
      console.error('News loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (article: Article) => {
    // Проверяем, нет ли уже в избранном
    if (!favorites.some(fav => fav.url === article.url)) {
      const newFavorites = [...favorites, article];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (url: string) => {
    const newFavorites = favorites.filter(item => item.url !== url);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const setSearchQuery = (query: string) => {
    setSearch(query);
  };

  const setCategoryFilter = (cat: string) => {
    setCategory(cat);
  };

  const refreshNews = () => {
    loadNews(1, search, category);
  };

  return {
    articles,
    favorites,
    loading,
    error,
    search,
    category,
    categories,
    loadNews,
    addToFavorites,
    removeFromFavorites,
    setSearchQuery,
    setCategoryFilter,
    refreshNews,
  };
};