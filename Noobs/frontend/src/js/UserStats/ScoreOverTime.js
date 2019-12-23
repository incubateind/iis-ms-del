import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'

const data = [
    { timestamp: 'Jan', score: 88 },
    { timestamp: 'Feb', score: 84 },
    { timestamp: 'Mar', score: 80 },
    { timestamp: 'Apr', score: 74 },
    { timestamp: 'May', score: 80 },
    { timestamp: 'Jun', score: 81 },
    { timestamp: 'Jul', score: 74 },
    { timestamp: 'Aug', score: 70 },
    { timestamp: 'Sep', score: 66 },
    { timestamp: 'Oct', score: 60 },
    { timestamp: 'Nov', score: 60 },
    { timestamp: 'Dec', score: 60 },
]

const ScoreOverTime = props => {
    const [filter, setFilter] = useState('LAST YEAR')
    const theme = useTheme()

    return (
        <DashboardCard
            title={'Score over time'}
            withFilter current={filter} onChange={setFilter}
            CardContentProps={{
                style: {
                    height: '300px',
                    marginTop: '10px',
                    marginLeft: '-36px',
                    marginRight: '10px'
                }
            }}
        >
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <XAxis dataKey={'timestamp'}/>
                    <YAxis/>
                    <Tooltip/>
                    <Line
                        type={'monotone'}
                        dataKey={'score'}
                        stroke={theme.palette.primary[300]}
                    />
                </LineChart>
            </ResponsiveContainer>
        </DashboardCard>
    )
}

export default ScoreOverTime
