import axios from 'axios';

// Định nghĩa các hàm lấy token trước khi dùng
export const getToken = () => {
    if (typeof window === "undefined") return null;
    const tokenData = localStorage.getItem("accessToken");
    return tokenData || null;
};

export const getTokenTitan = () => {
    if (typeof window === "undefined") return null;
    const tokenData = localStorage.getItem("titanToken");
    return tokenData || null;
};

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiTitanClient = axios.create({
    baseURL: 'https://api.titantrading.io/api/v1/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thiết lập interceptor cho apiClient
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

// Thiết lập interceptor cho apiTitanClient
apiTitanClient.interceptors.request.use(
    (config) => {
        const token = getTokenTitan();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Hàm hỗ trợ build query params
const buildQueryParams = (params?: Record<string, any>) => {
    if (!params) return "";
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
};

export const api = {
    get: (url: string, params?: Record<string, any>, config = {}) =>
        apiClient.get(`${url}${buildQueryParams(params)}`, config),
    post: (url: string, data: any, config = {}) => apiClient.post(url, data, config),
    put: (url: string, data: any, config = {}) => apiClient.put(url, data, config),
    delete: (url: string, config = {}) => apiClient.delete(url, config),
};

export const apiTian = {
    get: (url: string, params?: Record<string, any>, config = {}) =>
        apiTitanClient.get(`${url}${buildQueryParams(params)}`, config),
    post: (url: string, data: any, config = {}) => apiTitanClient.post(url, data, config),
    put: (url: string, data: any, config = {}) => apiTitanClient.put(url, data, config),
    delete: (url: string, config = {}) => apiTitanClient.delete(url, config),
};

// Xuất các axios instance theo dạng named exports
export { apiClient, apiTitanClient };
