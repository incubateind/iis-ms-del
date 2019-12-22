import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useTheme from '@material-ui/core/styles/useTheme'
import Grid from '@material-ui/core/Grid'
import Filter from './Filter'
import Button from '@material-ui/core/Button'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

const DashboardCard = ({ children, title, CardProps = {}, CardContentProps = {}, withFilter, current, onChange, values }) => {
    const theme = useTheme()

    return (
        <Card {...CardProps}>
            <Grid
                container
                style={{ padding: theme.spacing(2) }}
                alignItems={'center'}
                justify={'space-between'}
            >
                <Typography variant={'h2'}>
                    {title}
                </Typography>
                {withFilter && <Filter current={current} onChange={onChange} values={values}/>}
            </Grid>
            <Divider/>
            <CardContent {...CardContentProps}>
                {children}
            </CardContent>
        </Card>
    )
}

export default DashboardCard
