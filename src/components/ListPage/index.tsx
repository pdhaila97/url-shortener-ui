import { Box, Typography, List, ListItem, Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import URLListTable from './URLListTable';

function ListPage(props: any) {

    const [list, setList]: any = useState([""]);

    useEffect(() => {
        const urlsLS = JSON.parse(localStorage.getItem("urlsLS") || "[]");

        setList(urlsLS);
    }, []);

    return <>
        <Box px={2}>
            <Box textAlign="center" py={4}><Typography variant="h4">List of short URLs created</Typography></Box>
            <Box pb={4}><URLListTable list={list}/></Box>
        </Box>
    </>
}

export default ListPage;