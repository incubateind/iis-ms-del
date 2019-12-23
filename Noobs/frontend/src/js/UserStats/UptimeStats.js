import React, { useState } from 'react'
import { CartesianGrid, Line, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from 'recharts'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'
import { flatten, groupBy } from 'lodash'

const data = [
    { timestamp: '00:00', score: 1 },
    { timestamp: '01:00', score: 1 },
    { timestamp: '02:00', score: 1 },
    { timestamp: '03:00', score: 1 },
    { timestamp: '04:00', score: 1 },
    { timestamp: '05:00', score: 0 },
    { timestamp: '06:00', score: 0 },
    { timestamp: '07:00', score: 0 },
    { timestamp: '08:00', score: 0 },
    { timestamp: '09:00', score: 0 },
    { timestamp: '10:00', score: 0 },
    { timestamp: '11:00', score: 0 },
    { timestamp: '12:00', score: 0 },
    { timestamp: '13:00', score: 0 },
    { timestamp: '14:00', score: 0 },
    { timestamp: '15:00', score: 1 },
    { timestamp: '16:00', score: 1 },
    { timestamp: '17:00', score: 1 },
    { timestamp: '18:00', score: 1 },
    { timestamp: '19:00', score: 1 },
    { timestamp: '20:00', score: 0 },
    { timestamp: '21:00', score: 0 },
    { timestamp: '22:00', score: 0 },
    { timestamp: '23:00', score: 0 },
    { timestamp: '24:00', score: 1 },
]

const UptimeStats = ({ data }) => {
    const theme = useTheme()

    let uptime = flatten(data.trips.map(t => t.readings))
        .sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
    console.log(uptime)
    uptime = groupBy(uptime, a => new Date(a.timestamp).getHours())
    uptime = Object.keys([...Array(25)])
        .map(n => ({ timestamp: `${n < 10 ? '0' + n : n}:00`, score: Boolean(uptime[n]) ? 1 : 0}))

    return (
        <DashboardCard
            title={'Driver uptime'}
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
                <AreaChart data={uptime}>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <XAxis dataKey={'timestamp'}/>
                    <YAxis/>
                    <Tooltip/>
                    <Area
                        type={'monotone'}
                        dataKey={'score'}
                        stroke={theme.palette.primary[300]}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardCard>
    )
}

export default UptimeStats
