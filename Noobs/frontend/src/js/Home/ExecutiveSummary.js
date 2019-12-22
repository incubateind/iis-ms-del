import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { spacing } from '@material-ui/system'
import DashboardCard from '../common/DashboardCard'
import ScoreDistributionChart from './ScoreDistributionChart'
import { PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import ScoreOverTime from './ScoreOverTime'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/core/SvgIcon/SvgIcon'
import { DatePicker } from '@material-ui/pickers'
import Divider from '@material-ui/core/Divider'

const ExecutiveSummary = () => {
    return (
        <>
            <Grid container alignItems={'center'} justify={'space-between'}>
                <Typography variant={'h1'}>
                    Summary
                </Typography>
            </Grid>
            <Divider style={{ margin: '16px 0' }}/>
            <Grid
                container
                justify='center'
                alignItems='flex-start'
                direction='column'
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <DashboardCard title='Skill distribution'>
                            <ScoreDistributionChart/>
                        </DashboardCard>
                    </Grid>
                    <Grid item xs={8}>
                        <ScoreOverTime/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ExecutiveSummary
