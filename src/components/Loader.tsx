import React from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';


const LoadingGIF = styled.img`
    height: auto;
    width: 100px;
`;

const StyledBox = styled(Box)`
top: calc((100% - 100px)/2);;
position: absolute;
left: calc((100vw - 100px)/2);
`;
export default () => {
    return (
        <StyledBox>
            <LoadingGIF src={require('../assets/loaderGif.gif')} />
        </StyledBox>
    );
}