import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Logo from './Logo'
import Grid from '@material-ui/core/Grid'
import useTheme from '@material-ui/core/styles/useTheme'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import { Tooltip } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    main: {
        top: 0, left: 0,
        height: '100%', width: theme.spacing(8),
        color: theme.palette.custom.lightBlue,
        padding: theme.spacing(4, 0),
        backgroundColor: theme.palette.primary[900]
    }
}))

const Header = props => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <AppBar className={classes.main}>
            <Grid
                container
                direction={'column'}
                alignItems={'center'}
                justify={'space-between'}
                style={{ height: '100%' }}
            >
                <Logo style={{ width: '30px', height: 'auto' }}/>
                <Grid item container direction={'column'} alignItems={'center'}>
                    <Tooltip title={'Settings'} placement={'right-start'}>
                        <IconButton style={{ color: 'inherit', marginBottom: theme.spacing(2) }} size={'small'}>
                            <SettingsIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Account'} placement={'right-start'}>
                        <IconButton style={{ color: 'inherit '}} size={'small'}>
                            <AccountCircle/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header
