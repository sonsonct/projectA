import { PostQuery } from "@/app/interfaces/queryPost.interface";
import { api } from "@/app/lib/apiClient";

export async function getPosts(options?: PostQuery) {
    try {
        const response = await api.get('public/articles', options);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getDetailPosts(id) {
    try {
        const response = await api.get(`public/articles/` + id);

        return response.data.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}