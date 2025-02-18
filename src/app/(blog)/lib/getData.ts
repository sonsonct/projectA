import { api } from "@/app/lib/apiClient";

export async function getPosts() {
    try {
        const response = await api.get('public/articles');
        await sleep(5000);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}