const API_KEY = '0a2c733937054ad8a44d13139ae13483';
const BASE_URL = 'https://newsapi.org/v2';

export const api = {
    async getNews(page=1, category='general', search='') {
        const params = new URLSearchParams({
            page: page.toString(),
            pageSize: '10',
            apikey: API_KEY,
        });

        if (search) {
            params.append('q', search);
        } else {
            params.append('country', 'us');
            if (category !== 'all') {
                params.append('category', category);
            }
        }

        const endpoint = search ? '/everything' : '/top-headlines';
        const response = await fetch(`${BASE_URL}${endpoint}?${params}`);

        if (!response.ok) throw new Error('Failed to fetch news');
    
        return response.json();
    },


};

export const CATEGORIES = [
  'all', 'business', 'entertainment', 'general', 
  'health', 'science', 'sports', 'technology'
]