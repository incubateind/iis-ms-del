import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import Logo from './Header/Logo'
import useTheme from '@material-ui/core/styles/useTheme'

const useStyles = makeStyles(theme => ({
    main: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.primary[900],
        zIndex: 10000
    },
    box: {
        height: '400px', width: '300px',
        backgroundColor: '#fff',
        boxShadow: `${theme.shadows[4]} inset`
    }
}))

const Login = props => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.main}>
            <Grid container justify={'center'} alignItems={'center'} style={{ height: '100%', width: '100%' }}>
                <div>
                    <Grid container justify={'center'} style={{ color: theme.palette.primary[100] }} alignItems={'center'}>
                        <Logo style={{ height: '70px', width: '70px' }}/>
                        <Typography variant={'h1'}>
                            Some name
                        </Typography>
                    </Grid>
                    <Box className={classes.box}>

                    </Box>
                </div>
            </Grid>
        </div>
    )
}

export default Login
