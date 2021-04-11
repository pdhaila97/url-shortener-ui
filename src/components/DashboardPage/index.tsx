import { Box, Button, Input, InputLabel, Link, List, ListItem, Typography } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { generateShortUrl } from '../../services/httpService';
import Switch from '@material-ui/core/Switch';
import DateTimePicker from '../DateTimePicker';
import styled from 'styled-components';

const StyledForm = styled.form`
width: 100%;
max-width: 550px;
`;

function DashboardPage (props: any) {

    const [fieldValues, setFieldValues] = useState({
        url: "",
        customizeUrl: false,
        customization: {
            expiryDate: {
                enabled: false,
                value: new Date()
            },
            logging: false
        }
    });

    const [url, setUrl] = useState("");

    const updateFieldValues = (fieldName: string, value: any) => {
        setFieldValues((fieldValues) => {
            return {
                ...fieldValues,
                [fieldName]: value
            }
        })
    }

    const toggleCustomization = () => {
        updateFieldValues("customizeUrl", !fieldValues.customizeUrl);
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        let customizationObj: any;

        if(fieldValues.customizeUrl) {
            customizationObj = {
                expiryTime: fieldValues.customization.expiryDate.enabled ? fieldValues.customization.expiryDate.value.getTime() : null,
                loggingEnabled: fieldValues.customization.logging
                // etc
            }
        }

        let longUrl = fieldValues.url.trim();
        if(longUrl) {
            try {
                let longUrlArr = longUrl.split("://");
                if(longUrlArr.length === 1) {
                    longUrlArr.unshift("http");
                }
                longUrl = longUrlArr.join("://");
                generateShortUrl(longUrl, customizationObj).then((value) => {
                    const urlsLS = JSON.parse(localStorage.getItem("urlsLS") || "[]");
                    const url = `${window.location.origin}/${value}`;
                    urlsLS.push({
                        shortUrl: url,
                        url: fieldValues.url,
                        expiryTime: customizationObj ? customizationObj.expiryTime : null,
                        loggingEnabled: customizationObj ? customizationObj.loggingEnabled : null
                    });
                    localStorage.setItem("urlsLS", JSON.stringify(urlsLS));
                    setUrl(url);
                });
            } catch (err) {
                alert("Invalid URL")
            }
        }
    }

    const updateDate = (value: any) => {
        updateFieldValues("customization", {
            ...fieldValues.customization,
            expiryDate: {
                ...fieldValues.customization.expiryDate,
                value: value
            }
        })
    }

    const toggleLogging = () => {
        updateFieldValues("customization", {
            ...fieldValues.customization,
            logging: !fieldValues.customization.logging
        });
    }

    const toggleExpiration = () => {
        updateFieldValues("customization", {
            ...fieldValues.customization,
            expiryDate: {
                ...fieldValues.customization.expiryDate,
                enabled: !fieldValues.customization.expiryDate.enabled
            }
        });
    }

    return (
        <Box mt={2} height={1} display="flex" flexDirection="column" alignItems="center">
            <StyledForm onSubmit={onSubmit}>
                <Box display="flex" flexDirection="column">
                    <Box mb={2}><Input fullWidth name="url" value={fieldValues.url} onChange={(e) => updateFieldValues(e.target.name, e.target.value)} /></Box>
                    {/* customize url */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <InputLabel>Customize your URL</InputLabel>
                        <Switch checked={fieldValues.customizeUrl} onChange={toggleCustomization} />
                    </Box>
                    {fieldValues.customizeUrl && <Box>
                            <List>
                                <ListItem>
                                    <Typography>Enable Expiration Time: </Typography>
                                    <Switch checked={fieldValues.customization.expiryDate.enabled} onChange={toggleExpiration}></Switch>
                                </ListItem>
                                {fieldValues.customization.expiryDate.enabled && <ListItem>
                                    <Box pr={1}><Typography>Set Expiration Time: </Typography></Box>
                                    <DateTimePicker value={fieldValues.customization.expiryDate.value} onChange={updateDate}></DateTimePicker>
                                </ListItem>}
                                <ListItem>
                                    <Typography>Enable Logging: </Typography>
                                    <Switch checked={fieldValues.customization.logging} onChange={toggleLogging}></Switch>
                                </ListItem>
                            </List>
                        </Box>}
                    <Button variant="contained" type="submit">Generate Short URL</Button>
                </Box>
            </StyledForm>
            {url && <><Box my={2}><Typography variant="h5">Short URL - </Typography></Box>
            <Link href={url}>{url}</Link></>}
        </Box>
    )
}

export default DashboardPage;