import axios from "axios";

const BASEAPI = "http://localhost:2000";

export const API = {
    signin: async (firstName: string, lastName: string, email: string, password: string) => {
        const response = await axios.post(`${BASEAPI}/devtask/signin`, {
            firstName,
            lastName,
            email,
            password
        });

        return response.data;
    },
    autoLogin: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/devtask/auth/auto-login`, {
            token
        });

        return response.data;
    },
    login: async (email: string, password: string) => {
        const response = await axios.post(`${BASEAPI}/devtask/login`, {
            email,
            password
        });

        return response.data;
    },
    forgotPassword: async (email: string) => {
        const response = await axios.post(`${BASEAPI}/devtask/forgotpassword`, {
            email
        });

        return response.data;
    },
    recoverPassword: async (token: string, newPassword: string) => {
        const response = await axios.put(`${BASEAPI}/devtask/recoverpassword`, {
            token,
            newPassword
        });
        
        return response.data;
    },
    tokenVerification: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/devtask/tokenverification`, {
            token
        });

        return response.data;
    },
    getDashboardInfo: async (id: string) => {
        const response = await axios.get(`${BASEAPI}/devtask/${id}/dashboard`);
        return response.data;
    },
    getUserInfo: async (id: string) => {
        const response = await axios.get(`${BASEAPI}/devtask/${id}/user`);
        return response.data;
    },
    updateUserInfo: async (id: string, formData: FormData) => {
        const response = await axios({
            method: 'put',
            url: `${BASEAPI}/devtask/${id}/user`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    }
};