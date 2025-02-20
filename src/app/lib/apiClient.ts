import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getToken = () => {
    if (typeof window === "undefined") return null;

    const tokenData = localStorage.getItem("accessToken");
    if (!tokenData) return null;

    return tokenData;
};
const buildQueryParams = (params?: Record<string, any>) => {
    if (!params) return "";
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
};

export const api = {
    get: (url: string, params?: Record<string, any>, config = {}) =>
        apiClient.get(`${url}${buildQueryParams(params)}`, config),
    post: (url, data, config) => apiClient.post(url, data, config),
    put: (url, data, config) => apiClient.put(url, data, config),
    delete: (url, config) => apiClient.delete(url, config),
};

export default apiClient;
