import React from 'react'
import Container from '@material-ui/core/Container'
import useTheme from '@material-ui/core/styles/useTheme'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    fullSize: {
        height: '100%', width: '100%'
    },
}))

const Main = ({ children }) => {
    const { fullSize } = useStyles()
    const theme = useTheme()

    return (
        <Grid
            container
            className={fullSize}
            style={{ padding: theme.spacing(2, 2, 2, 10) }}
        >
            {children}
        </Grid>
    )
}

export default Main
