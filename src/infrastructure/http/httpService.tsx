
import axios from 'axios';
import { toast } from 'react-toastify';

const apiBase = `/api`;

export interface Toasts {
    error?: string;
    success?: string;
}

const handleError = (err: any, cancellationToken: any, toasts: Toasts | undefined) => {
    console.error(err);
    if (err.response && err.response.status === 401) {
        cancellationToken.cancel();
    }

    const defaultMessage = toasts?.error;
    const exMessage = err.response?.data?.message;

    if (defaultMessage && exMessage) {
        toast.error(
            <div className="toast-error">
                <div className="toast-error--default">{defaultMessage}:</div>
                <div className="toast-error--message">{exMessage}</div>
            </div>
            , { autoClose: 5000 });
    }
    else if (defaultMessage) {
        toast.error(defaultMessage)
    }
    throw err;
}

const handleResponse = (res: any) => {
    if (res.status < 200 && res.status >= 300) { throw res; }
    return res.data;
};

const handleBlobResponse = (res: any) => {
    if (res.status < 200 && res.status >= 300) { throw res; }
    return res;
};


const handleSuccessToast = (toasts: Toasts | undefined, data: any) => {
    toasts?.success && toast.info(toasts.success);
    return data;
}

class HttpService {

    cache = new Map<string, any>();

    clearCache(url: string) {
        this.cache.delete(url);
    }

    cacheAndReturn(url: string, data: any) {
        this.cache.delete(url);
        data && this.cache.set(url, Array.isArray(data) ? [...data] : data);
        return data;
    }

    addBaseHeaders = (headers?: any) => {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        return headers;
    };

    buildUrl(url: string) {
        return `${apiBase}${url}`;
    }

    addAccessTokenInterceptor = (getAccessTokenSilently: () => Promise<any>) => {
        axios.interceptors.request.use(async (config) => {
            const token = await getAccessTokenSilently();
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    };

    add401LogoutInterceptor = (logout: () => Promise<any>) => {
        axios.interceptors.response.use(
            res => res,
            err => {
                if (err.response && err.response.status === 401) {
                    return logout();
                }
                return Promise.reject(err);
            });
    }

    async get(url: string, toasts?: Toasts, extraAttributes: any = {}) {

        const cancelSource = axios.CancelToken.source();
        return axios.get(this.buildUrl(url),
            {
                cancelToken: cancelSource.token,
                headers: this.addBaseHeaders(),
                ...extraAttributes
            })
            .then(handleResponse)
            .catch(err => handleError(err, cancelSource, toasts));
    }

    async getBlob(url: string, toasts?: Toasts) {

        const cancelSource = axios.CancelToken.source();
        return axios.get(this.buildUrl(url),
            {
                cancelToken: cancelSource.token,
                headers: this.addBaseHeaders(),
                responseType: 'blob'
            })
            .then(handleBlobResponse)
            .catch(err => handleError(err, cancelSource, toasts));
    }

    async getCached<T>(url: string, toasts?: Toasts): Promise<T[]> {

        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }

        return this.get(url, toasts).then(data => this.cacheAndReturn(url, data))
    }


    async getCachedSingle<T>(url: string, toasts?: Toasts): Promise<T> {

        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }

        return this.get(url, toasts).then(data => this.cacheAndReturn(url, data))
    }

    async put(url: string, body: any, toasts?: Toasts) {

        const cancelSource = axios.CancelToken.source();
        return axios.put(this.buildUrl(url), body,
            {
                cancelToken: cancelSource.token,
                headers: this.addBaseHeaders()
            })
            .then(handleResponse)
            .then((data) => handleSuccessToast(toasts, data))
            .catch(err => handleError(err, cancelSource, toasts));
    }

    async post(url: string, body: any, toasts?: Toasts) {
        const cancelSource = axios.CancelToken.source();
        return axios.post(this.buildUrl(url), body,
            {
                cancelToken: cancelSource.token,
                headers: this.addBaseHeaders()
            })
            .then(handleResponse)
            .then((data) => handleSuccessToast(toasts, data))
            .catch(err => handleError(err, cancelSource, toasts));
    }

    async postFormData(url: string, body: any, toasts?: Toasts) {
        const cancelSource = axios.CancelToken.source();

        const headers = this.addBaseHeaders();
        headers['Content-Type'] = 'multipart/form-data';

        return axios.post(this.buildUrl(url), body,
            {
                cancelToken: cancelSource.token,
                headers,

            })
            .then(handleResponse)
            .then((data) => handleSuccessToast(toasts, data))
            .catch(err => handleError(err, cancelSource, toasts));
    }

    async delete(url: string, toasts?: Toasts) {
        const cancelSource = axios.CancelToken.source();
        return axios.delete(this.buildUrl(url),
            {
                cancelToken: cancelSource.token,
                headers: this.addBaseHeaders()
            })
            .then(handleResponse)
            .then((data) => handleSuccessToast(toasts, data))
            .catch(err => handleError(err, cancelSource, toasts));
    }
}

const httpService = new HttpService();

export default httpService;
