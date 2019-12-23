import React, { useState } from 'react'
import Header from './Header'
import Grid from '@material-ui/core/Grid'
import ClassBreakdown from './ClassBreakdown'
import GeneralStats from './GeneralStats'
import ScoreOverTime from './ScoreOverTime'
import UptimeStats from './UptimeStats'
import TomTomMap from './TomTomMap'
import TripsData from '../data/TripsData'
import { useParams } from 'react-router-dom'

const UserStats = props => {
    const { id } = useParams()
    const data = TripsData.find(u => u.userId === parseInt(id))
    const [currentDay, setCurrentDay] = useState(null)

    const daySelected = Boolean(currentDay)

    return (
        <div style={{ width: '100%' }}>
            <Header current={currentDay} onChange={setCurrentDay} username={data.username}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <GeneralStats data={data}/>
                </Grid>
                {!daySelected ? (
                    <Grid item xs={6}>
                        <ScoreOverTime/>
                    </Grid>
                ) : (
                    <Grid item xs={6}>
                        <UptimeStats data={data}/>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <ClassBreakdown daySelected={daySelected} data={data}/>
                </Grid>
                {daySelected && (
                    <Grid item xs={12}>
                        <TomTomMap data={data}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default UserStats
