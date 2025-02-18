import { api } from "@/app/lib/apiClient";

export async function login(email, password) {
    const response = await api.post('user/auth/login', { email, password });

    return response.data;
}
