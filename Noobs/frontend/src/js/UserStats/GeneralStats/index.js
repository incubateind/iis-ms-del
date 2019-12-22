import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import DashboardCard from '../../common/DashboardCard'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
    ResponsiveContainer,
    BarChart,
    YAxis,
    XAxis,
    Bar,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts'
import useTheme from '@material-ui/core/styles/useTheme'
import { flattenDeep } from 'lodash/array'
import { PHONE_LEFT, PHONE_RIGHT, TEXTING_LEFT, TEXTING_RIGHT } from '../../constants'

const useStyles = makeStyles(theme => ({
    score: {
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center'
    }
}))

const data = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 200 },
]

const data2 = [
    { name: 'Safe', value: 55 },
    { name: 'Phone', value: 15 },
    { name: 'Distracted', value: 30 },
]

const GeneralStats = ({ daySelected, data }) => {
    const classes = useStyles()
    const theme = useTheme()

    const predClasses = flattenDeep(data.trips.map(t => t.readings.map(r => r.predictionClasses)))
    const score_ = Math.round(predClasses.filter(c => c === 'c0').length / predClasses.length * 100)
    const score = score_ + '%'
    const safeScore = Math.round(predClasses.filter(c => c === 'c0').length / predClasses.length * 100)
    const data2 = [
        { name: 'Safe', value: safeScore },
        { name: 'Phone', value: Math.round(predClasses.filter(c => [PHONE_RIGHT, PHONE_LEFT, TEXTING_LEFT, TEXTING_RIGHT].includes(c)).length / predClasses.length * 100) },
        { name: 'Distracted', value: 100 - safeScore }
    ]

    return (
        <DashboardCard title={daySelected ? 'Day score' : 'Overall Score'} CardContentProps={{ style: { height: '250px' } }}>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <text
                                x={100}
                                y={100}
                                dy={14}
                                dx={10}
                                fontWeight={600}
                                fontSize={24}
                                textAnchor={'middle'}
                                fill={theme.palette.primary.main}
                            >
                                {score}
                            </text>
                            <Pie
                                innerRadius={70}
                                outerRadius={100}
                                data={[{ value: score_ }, { value: 100 - score_ }]}
                                paddingAngle={8}
                                dataKey={'value'}
                                cx={100}
                                cy={100}
                                fill={theme.palette.primary.main}
                            >
                                <Cell fill={theme.palette.secondary.main}/>
                                <Cell fill={theme.palette.primary.main}/>
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item container justify={'center'} alignItems={'center'} xs={8} style={{ paddingTop: '10px' }}>
                    <ResponsiveContainer>
                        <BarChart data={data2}>
                            <CartesianGrid strokeDasharray={'3 3'}/>
                            <YAxis dataKey={'value'}/>
                            <XAxis dataKey={'name'}/>
                            <Tooltip/>
                            <Bar dataKey={'value'} barSize={20}>
                                <Cell fill={theme.palette.custom.green}/>
                                <Cell fill={theme.palette.secondary[500]}/>
                                <Cell fill={theme.palette.secondary[500]}/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </DashboardCard>
    )
}

export default GeneralStats
