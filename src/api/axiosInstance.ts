import axios from 'axios';

//
export const BASEURL = import.meta.env.VITE_APP_BASE_API_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;

const service = axios.create({
    baseURL: BASEURL,
    timeout: 1000000
});

export function configureAxios(accessToken: any) {
    service.interceptors.request.use(
        config => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

}



service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log('errr', error);
        if (error.response && error.response.status === 401) {
            localStorage.clear()
            window.location.replace('/');
        }
        return Promise.reject(error);
    },
);


service.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default service;
