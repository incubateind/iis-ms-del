import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'

const data = [
    { timestamp: 'Jan', score: 68 },
    { timestamp: 'Feb', score: 74 },
    { timestamp: 'Mar', score: 77 },
    { timestamp: 'Apr', score: 60 },
    { timestamp: 'May', score: 61 },
    { timestamp: 'Jun', score: 61 },
    { timestamp: 'Jul', score: 68 },
    { timestamp: 'Aug', score: 70 },
    { timestamp: 'Sep', score: 72 },
    { timestamp: 'Oct', score: 70 },
    { timestamp: 'Nov', score: 70 },
    { timestamp: 'Dec', score: 69 },
]

const ScoreOverTime = props => {
    const [filter, setFilter] = useState('LAST YEAR')
    const theme = useTheme()

    return (
        <DashboardCard
            title={'Overall score over time'}
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
