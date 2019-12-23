import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Main from './js/Main'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import './style.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './js/Header'
import Home from './js/Home'
import UserStats from './js/UserStats'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Login from './js/Login'

const PRIMARY = {
    900: '#1b2b4b',
    800: '#233b64',
    700: '#294570',
    600: '#314e7c',
    500: '#375684',
    400: '#566e94',
    300: '#7487a5',
    200: '#9aa9bf',
    100: '#c1cad9',
    50: '#e7eaef',
}

const SECONDARY = {
    900: '#8a003a',
    800: '#ac003e',
    700: '#bf0040',
    600: '#d30942',
    500: '#e31243',
    400: '#ea375d',
    300: '#f05b78',
    200: '#f68a9e',
    100: '#fbb8c4',
    50: '#fde3e7',
    main: '#bf0040'
}

const RUSSIAN_GREEN = '#5E9360'

const GREY = '#ddd'

const button = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.7)'
}

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        color: '#191919',
        h1: {
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.1rem',
        },
        button
    },
    palette: {
        type: 'light',
        primary: PRIMARY,
        secondary: SECONDARY,
        custom: {
            grey: '#DDD',
            lightBlue: '#DCEAFF',
            green: RUSSIAN_GREEN
        },
        background: {
            default: '#fff'
        }
    },
    overrides: {
        MuiCard: {
            root: {
                boxShadow: 'none !important',
                border: `1px solid ${GREY}`
            }
        },
        MuiCardContent: {
            root: {
                paddingBottom: '16px !important'
            }
        },
        MuiMenu: {
            paper: {
                boxShadow: 'none',
                border: `1px solid ${GREY}`
            },
            list: {
                padding: 0
            }
        },
        MuiMenuItem: {
            root: button
        }
    }
})

const App = props => {
    const [login, setLogin] = useState(true)

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {/*{login && <Login/>}*/}
                <Header/>
                <Main>
                    <Router>
                        <Switch>
                            <Route exact path={'/'} component={Home}/>
                            <Route exact path={'/users/:id'} component={UserStats}/>
                        </Switch>
                    </Router>
                </Main>
                <Main/>
            </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
