import axios, {AxiosError} from "axios";
import type {AxiosRequestConfig} from "axios";
import {LocalStorage} from "@/util/localStorage";
import {AuthConfig} from "@/service/auth/AuthConfig";
import {showNotifyError} from "@/component/Notify";
import {ref} from "vue";

export type Response<T> = {
    readonly data?: T,
    readonly status?: number
};

const getAxiosRequestConfig = () => {
    const accessToken = LocalStorage.getItem(AuthConfig.ACCESS_TOKEN);
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
}

export async function get<T>(subdirectory: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    try {
        const response = await axios.get<T>(`${import.meta.env.VITE_BASE_URL}${subdirectory}`, config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (e) {
        return errorHandler(e);
    }
}

export async function getWithAuth<T>(subdirectory: string): Promise<Response<T>> {
    return get<T>(subdirectory, getAxiosRequestConfig());
}

export async function post<T>(subdirectory: string, body: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    try {
        const response = await axios.post<T>(`${import.meta.env.VITE_BASE_URL}${subdirectory}`, body, config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (e) {
        return errorHandler(e);
    }
}

export async function postWithAuth<T>(subdirectory: string, body: object): Promise<Response<T>> {
    return post<T>(subdirectory, body, getAxiosRequestConfig());
}

export async function put<T>(subdirectory: string, body: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    try {
        const response = await axios.put<T>(`${import.meta.env.VITE_BASE_URL}${subdirectory}`, body, config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (e) {
        return errorHandler(e);
    }
}

export async function putWithAuth<T>(subdirectory: string, body: object): Promise<Response<T>> {
    return put<T>(subdirectory, body, getAxiosRequestConfig());
}

export async function del<T>(subdirectory: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    try {
        const response = await axios.delete<T>(`${import.meta.env.VITE_BASE_URL}${subdirectory}`, config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (e) {
        return errorHandler(e);
    }
}

export async function deleteWithAuth<T>(subdirectory: string): Promise<Response<T>> {
    return del<T>(subdirectory, getAxiosRequestConfig());
}

export async function patch<T>(subdirectory: string, body: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    try {
        const response = await axios.patch<T>(`${import.meta.env.VITE_BASE_URL}${subdirectory}`, body, config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (e) {
        return errorHandler(e);
    }
}

export async function patchWithAuth<T>(subdirectory: string, body: object): Promise<Response<T>> {
    return patch<T>(subdirectory, body, getAxiosRequestConfig());
}

const errorHandler = (e: unknown) => {
    const createErrorMessage = (status?: number) => {
        switch (status) {
            case 400:
                return ` ${status}: リクエストの内容が正しくありません。`;
            case 403:
                return ` ${status}: 認証エラー`;
            case 429:
                return `Too Many Requests ${status}`;
            case 500:
                return `Internal Server Error ${status}`;
            case 503:
                return `Service Temporarily Unavailable ${status}`;
            case 504:
                return `Gateway Timeout ${status}`;
            default:
                return `Unknown Error. ${status}`
        }
    };

    const error = e as AxiosError;
    if (error.response?.status === 401) {
        window.location.href = "login";
        return {
            status: error.response?.status
        }
    } else if (error.response?.status === 403) {
        showNotifyError(createErrorMessage(error?.response?.status))
        return {
            status: error.response?.status
        }
    } else if (
        error.response?.status === 404
    ) {
        return {
            status: error.response?.status
        }
    } else {
        showNotifyError(createErrorMessage(error?.response?.status))
        throw {
            status: error.response?.status
        }
    }
}

export class HttpHandler {
    loading = ref(false);
    handle: <T>(fn: Promise<T>) => Promise<T> = async <T>(fn: Promise<T>) => {
        try {
            this.loading.value = true;
            const response = await fn;
            this.loading.value = false;
            return response;
        } catch (e) {
            this.loading.value = false;
            throw "handle Error";
        }
    }
}

