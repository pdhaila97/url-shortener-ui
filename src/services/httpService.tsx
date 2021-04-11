import axios from 'axios';

export const httpService = () => {
    return axios.create({
        baseURL: 'http://localhost:4200'
    })
}

export const getAllNotes = (sort: any, showArchive: any) => {
    // const http = httpService();
    // const token = getUserToken();
    // return http.get("/notes", {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     },
    //     params: {
    //         sortAsc: sort.asc,
    //         showArchive
    //     }
    // })
}

export const generateShortUrl = async (url: string, customization?: any) => {
    const http = httpService();

    let queryparams;
    if(customization) {
        queryparams = {
            expiryTime: customization.expiryTime,
            loggingEnabled: customization.loggingEnabled
        }
    }
    const response = await http.post("/generate", {
        url: url
    }, {
        params: queryparams
    });

    return response.data.shortUrl;
}

export const getOriginalUrl = async (shortUrl: string) => {
    const http = httpService();
    const response = await http.get(`/${shortUrl}`);

    return response.data.url;
}