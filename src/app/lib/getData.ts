import { api, apiTian } from "./apiClient";

export async function myProfile() {
    const response = await api.get('account/myAccount');

    return response.data;
}

export async function updateUsername(username: string) {
    const response = await api.put('account/update-username', { username });

    return response.data;
}

export async function updatePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    const response = await apiTian.post('auth/change-password', { oldPassword, newPassword, confirmPassword });

    return response.data;
}

export async function updateAvatar(avatar: File) {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await api.put("account/update-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}
