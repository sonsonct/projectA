import { api } from "./apiClient";

export async function myProfile(token: string) {
    const response = await api.get('account/myAccount');

    return response.data;
}