import React, { useEffect } from 'react';
import { getOriginalUrl } from '../../services/httpService';
import Loader from '../Loader';

const errorCodeToMsgMap: any = {
    "SHORT_URL_EXPIRED": "Short URL has expired",
    "SHORT_URL_INVALID": "Short URL is invalid"
}

function RedirectionPage(props: any) {

    const shortHashUrl = props.match.params.id;

    useEffect(() => {
        getOriginalUrl(shortHashUrl).then((value) => {
            window.location.href = new URL(value).href;
        }).catch((err: any) => {
            alert(errorCodeToMsgMap[err.errorCode]);
            props.history.go(-1);
        });
    }, []);

    return <Loader />
}

export default RedirectionPage;