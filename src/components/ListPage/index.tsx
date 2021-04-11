import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React, { useEffect, useState } from 'react';
import URLListTable from './URLListTable';

function ListPage(props: any) {

    const [list, setList]: any = useState([""]);

    useEffect(() => {
        const urlsLS = JSON.parse(localStorage.getItem("urlsLS") || "[]");

        setList(urlsLS);
    }, []);

    const goToHome = () => {
        props.history.push("/");
    }

    return <>
        <Box px={2}>
            <Box textAlign="center" py={4}><Typography variant="h4">List of short URLs created</Typography></Box>
            <Box pb={4}><URLListTable list={list}/></Box>
            <Box pb={4} textAlign="center"><Link onClick={goToHome}><Typography>Return to create more short URLs</Typography></Link></Box>
        </Box>
    </>
}

export default ListPage;