import { Box, Button, InputLabel, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
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

    const [errors, setErrors]: any = useState({
        url: {
            status: false,
            message: ""
        }
    });

    const [url, setUrl]: any = useState(null);

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
                new URL(longUrl); // will throw an error for invalid url
                setErrors({url : {}})
                generateShortUrl(longUrl, customizationObj).then((value) => {
                    const urlsLS = JSON.parse(localStorage.getItem("urlsLS") || "[]");
                    const url = `${window.location.origin}/${value}`;
                    let urlObj = {
                        shortUrl: url,
                        url: fieldValues.url,
                        expiryTime: customizationObj ? customizationObj.expiryTime : null,
                        loggingEnabled: customizationObj ? customizationObj.loggingEnabled : null
                    };
                    urlsLS.push(urlObj);
                    localStorage.setItem("urlsLS", JSON.stringify(urlsLS));
                    setUrl(urlObj);
                });
            } catch (err) {
                setErrors({url: {
                    message: "Invalid URL. Please enter the complete URL",
                    status: true
                }})
            }
        } else {
            setErrors({url: {
                message: "Please enter a URL",
                status: true
            }})
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

    const goToListPage = () => {
        props.history.push("/list");
    }

    return (
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <Box pt={6}><Typography variant="h4">Enter a url</Typography></Box>
            <StyledForm onSubmit={onSubmit}>
                <Box mt={3} display="flex" flexDirection="column">
                    <Box mb={4}><TextField variant="outlined" error={errors.url.status} helperText={errors.url.message} fullWidth name="url" value={fieldValues.url} onChange={(e) => updateFieldValues(e.target.name, e.target.value)} /></Box>
                    {/* customize url */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <InputLabel>Customize your URL</InputLabel>
                        <Switch checked={fieldValues.customizeUrl} onChange={toggleCustomization} />
                    </Box>
                    {fieldValues.customizeUrl && <Box>
                            <List>
                                <ListItem>
                                    <InputLabel>Toggle Expiration Time: </InputLabel>
                                    <Switch checked={fieldValues.customization.expiryDate.enabled} onChange={toggleExpiration}></Switch>
                                </ListItem>
                                {fieldValues.customization.expiryDate.enabled && <ListItem>
                                    <Box pr={1}><InputLabel>Set Expiration Time: </InputLabel></Box>
                                    <DateTimePicker value={fieldValues.customization.expiryDate.value} onChange={updateDate}></DateTimePicker>
                                </ListItem>}
                                <ListItem>
                                    <InputLabel>Toggle Logging: </InputLabel>
                                    <Switch checked={fieldValues.customization.logging} onChange={toggleLogging}></Switch>
                                </ListItem>
                            </List>
                        </Box>}
                    <Box pt={6}><Button fullWidth color="primary" variant="contained" type="submit"><Typography variant="body1">Generate Short URL</Typography></Button></Box>
                    <Box pt={3} textAlign="center"><Link color="primary" onClick={goToListPage}><Typography variant="body1">Or view the list of URLs that you have generated</Typography></Link></Box>
                </Box>
            </StyledForm>
            {url && <><Box display="flex" justifyContent="center" alignItems="center" mt={4}><Typography variant="h6">This is your short URL - &nbsp;</Typography>
            <Link variant="h6" href={url.shortUrl}>{url.shortUrl}</Link>
            </Box>
            {url.expiryTime && <Box pt={2}>
                <Typography>The link will get expired by {new Date(url.expiryTime).toString()}</Typography>
            </Box>}
            {url.loggingEnabled && <Box pt={2}>
                <Typography>You have set the logging enabled for this short URL.</Typography>
            </Box>}
            </>}
        </Box>
    )
}

export default DashboardPage;