import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import ExecutiveSummary from './ExecutiveSummary'
import UsersSelection from './UsersSelection'
import TomTomMap from './TomTomMap'
import TripsData from '../data/TripsData'
import { flattenDeep } from 'lodash/array'

const Home = () => {
  // useEffect(() => {
    let users = []
    for (const tUser of TripsData) {
      let user = {userId: tUser.userId, username: tUser.username}
      user.lastLocation = tUser.trips[tUser.trips.length - 1].readings[tUser.trips[tUser.trips.length - 1].readings.length - 1].timestamp
      const predClasses = flattenDeep(tUser.trips.map(t => t.readings.map(r => r.predictionClasses)))
      const score_ = Math.round(predClasses.filter(c => c === 'c0').length / predClasses.length * 100)
      user.rating = score_ + '%'
      users.push(user)
    }
  // }, [TripsData])
  return (
    <div style={{width: '100%'}}>
        <ExecutiveSummary/>
        <UsersSelection users={users}/>
        <TomTomMap/>
    </div>
  )
}

export default Home;
