import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.titan-blog.warppipe.io/blog/api/v1/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    get: (url, config) => apiClient.get(url, config),
    post: (url, data, config) => apiClient.post(url, data, config),
    put: (url, data, config) => apiClient.put(url, data, config),
    delete: (url, config) => apiClient.delete(url, config),
};

export default apiClient;
