import React from 'react'
import { PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useTheme } from '@material-ui/core'

const data = [
    { name: '0 - 25', value: 0.1 },
    { name: '26 - 50', value: 0.2 },
    { name: '51 - 75', value: 0.6 },
    { name: '76 - 100', value: 0.1 }
]

const RADIAN = Math.PI / 180;
const renderLabel = function(entry) {
    return `${entry.name}: ${Math.round(entry.value * 100)}%`
}

const ScoreDistributionChart = () => {
    const theme = useTheme()
    const COLORS = [theme.palette.secondary[800], theme.palette.secondary[400], theme.palette.primary[400], theme.palette.primary[600]]

    return (
        <PieChart width={450} height={300}>
            <Pie
                data={data}
                cx={200}
                cy={150}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
            >
                {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    )
}

export default ScoreDistributionChart
