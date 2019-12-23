import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'

const data = [
    { timestamp: 'Aug', score: 43 },
    { timestamp: 'Sep', score: 73 },
    { timestamp: 'Oct', score: 85 },
    { timestamp: 'Nov', score: 33 },
    { timestamp: 'Dec', score: 72 },
]

const MiniScoreOverTime = props => {
    const [filter, setFilter] = useState('LAST YEAR')
    const theme = useTheme()

    return (
        <DashboardCard
            title={'Score over time'}
            CardContentProps={{
                style: {
                    height: '150px',
                    marginTop: '10px',
                    marginLeft: '-36px',
                    marginRight: '10px'
                }
            }}
            CardProps={{
                style: {
                    minWidth: '100px'
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

export default MiniScoreOverTime
