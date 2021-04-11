import axios from 'axios';

export const httpService = () => {
    return axios.create({
        baseURL: 'https://psd-shorturl-api.herokuapp.com'
    })
}

export const generateShortUrl = async (url: string, customization?: any) => {
    const http = httpService();

    let queryparams;
    if (customization) {
        queryparams = {
            expiryTime: customization.expiryTime,
            loggingEnabled: customization.loggingEnabled,
            customShortUrl: customization.customShortUrl
        }
    }

    return http.post("/generate", {
        url: url
    }, {
        params: queryparams
    }).then(res => res.data.shortUrl).catch(err => {
        throw err.response.data;
    });;
}

export const getOriginalUrl = async (shortUrl: string) => {
    const http = httpService();

    return http.get(`/${shortUrl}`).then(res => res.data.url).catch(err => {
        throw err.response.data;
    });
}

export const getLogsInformation = async (shortUrl: string) => {
    const http = httpService();
    return http.get(`/logs/${shortUrl}`).then(res => res.data).catch(err => {
        throw err.response.data;
    });;
}