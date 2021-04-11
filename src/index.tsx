import React from 'react';
import Box from '@material-ui/core/Box';
import ReactDOM from 'react-dom';
import { Switch, Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles'
import { createBrowserHistory as history } from 'history';
import DashboardPage from './components/DashboardPage';
import RedirectionPage from './components/RedirectionPage';
import ListPage from './components/ListPage';
import LogsPage from './components/LogsPage';


const theme = createMuiTheme({});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box height="inherit" width="inherit">
                <Router history={history()}>
                    <Switch>
                        <Route exact path="/list" component={ListPage} history={history()} />
                        <Route exact path="/logs/:id" component={LogsPage} history={history()} />
                        <Route exact path="/:id" component={RedirectionPage} history={history()} />
                        <Route exact path="/" component={DashboardPage} history={history()} />
                    </Switch>
                </Router>
            </Box>
        </ThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));