import React, { useState } from 'react'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'
import { CLASS_LABELS, SAFE_DRIVING } from '../constants'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'
import { flatten, flattenDeep, groupBy } from 'lodash'

const data_ = Object.keys(CLASS_LABELS)
    .map((k, index) => ({ key: k, name: CLASS_LABELS[k], value: index + 1 }))

// const data1 = data.map(i => ({ ...i, value: Math.random() * 20 }))
// const data2 = data.map(i => ({ ...i, value: Math.random() * 20 }))
// const data3 = data.map(i => ({ ...i, value: Math.random() * 20 }))

const ClassBreakdown = ({ daySelected, data }) => {
    const theme = useTheme()

    const filters = data.trips.map(t => {
        const start = new Date(t.readings[0].timestamp)
        const end = new Date(t.readings[t.readings.length - 1].timestamp)
        const format = date => {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
        }
        return `${format(start)} - ${format(end)}`
    })

    const dataMapping = data.trips.map(t => {
        const classes = flatten(t.readings.map(r => r.predictionClasses))
        const allNum = classes.length
        return Object.keys(CLASS_LABELS).map(l => ({
            value: classes.filter(c => c === l).length / allNum * 100,
            key: l,
            name: CLASS_LABELS[l]
        }))
    })

    const fullBreakdown = (() => {
        const classes = flattenDeep(data.trips.map(t => t.readings.map(r => r.predictionClasses)))
        const allNum = classes.length
        return Object.keys(CLASS_LABELS).map(l => ({
            value: classes.filter(c => c === l).length / allNum * 100,
            key: l,
            name: CLASS_LABELS[l]
        }))
    })()

    const [filter, setFilter] = useState(filters[0])

    const filterProps = daySelected ? {
        withFilter: true,
        values: filters,
        current: filter,
        onChange: setFilter
    } : {}

    return (
        <DashboardCard
            title={!daySelected ? 'Stats breakdown' : 'Trip breakdown'}
            {...filterProps}
            CardContentProps={{
                style: {
                    height: '500px', padding: theme.spacing(4),
                    marginLeft: -theme.spacing(3),
                }
            }}
        >
            <ResponsiveContainer>
                <BarChart data={daySelected ? dataMapping[filters.indexOf(filter)] : fullBreakdown} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <Bar dataKey={'value'} fill={theme.palette.primary[300]} barSize={30}>
                        {data_.map(i => (
                            <Cell
                                fill={i.key === SAFE_DRIVING ? theme.palette.custom.green : theme.palette.secondary[500]}
                                key={i.key}
                            />
                        ))}
                    </Bar>
                    <XAxis dataKey={'name'}/>
                    <YAxis unit={'%'}/>
                </BarChart>
            </ResponsiveContainer>
        </DashboardCard>
    )
}

export default ClassBreakdown
