import React, { useEffect } from 'react';
import { getOriginalUrl } from '../../services/httpService';
import Loader from '../Loader';

function RedirectionPage(props: any) {

    const shortHashUrl = props.match.params.id;
    
    useEffect(() => {
        getOriginalUrl(shortHashUrl).then((value) => {
            window.location.href = new URL(value).href;
        }).catch((err: any) => {
            alert("Your Short URL has expired");
        });
    }, []);

    return <Loader />
}

export default RedirectionPage;