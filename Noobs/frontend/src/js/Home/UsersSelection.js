import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// import { spacing } from '@material-ui/system'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
// import { deepOrange, deepPurple, green, blue } from '@material-ui/core/colors'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom'
import MiniScoreOverTime from './MiniScoreOverTime'
import { sortBy as lodashSortBy} from 'lodash/collection'
import Divider from '@material-ui/core/Divider'
import Filter from '../common/DashboardCard/Filter'

const stringToColor = function(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

const useListStyles = makeStyles(theme => ({
    main: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)'
        },
        padding: '16px',
        border: `1px solid ${theme.palette.custom.grey}`,
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    }
}))

const UsersSelection = ({history, users}) => {
    let defaultDrivers = []
    // const defaultDrivers = [
    //     {name: 'Alfonzo', rating: 3, lastDriven: new Date('2019-12-11T11:32:33+01:00'), improvement: 1},
    //     {name: 'Juliet', rating: 4.2, lastDriven: new Date('2019-12-10T11:32:33+01:00'), improvement: -0.2},
    //     {name: 'Thomas', rating: 3.8, lastDriven: new Date('2019-12-11T08:32:33+01:00'), improvement: 0.5},
    //     {name: 'Emma', rating: 3.6, lastDriven: new Date('2019-12-05T11:32:33+01:00'), improvement: 1.4},
    //     {name: 'Marc', rating: 4.1, lastDriven: new Date('2019-12-07T11:32:33+01:00'), improvement: -0.9}
    // ]
    lodashSortBy(users, ['name', 'username']).map(u => defaultDrivers.push({name: u.username, rating: u.rating, id: u.userId}))
    const [drivers, setDrivers] = useState(defaultDrivers)
    const [filterText, setFilterText] = useState('')
    const [sortBy, setSortBy] = useState('NAME')
    const filterDrivers = (name) => {
        setFilterText(name)
        const unsorted = defaultDrivers.filter(d => d.name.toLowerCase().startsWith(name.toLowerCase()))
        setDrivers(unsorted.sort((a, b) => a[sortBy] - b[sortBy]))
    }
    const sortDrivers = (filtering) => {
        const unsorted = defaultDrivers.filter(d => d.name.toLowerCase().startsWith(filterText.toLowerCase()))
        if (sortBy == 'name') {
            setDrivers(lodashSortBy(unsorted, ['name', 'username']))
        } else {
            setDrivers(lodashSortBy(unsorted, ['rating', 'score']))
        }
        // setDrivers(unsorted.sort((a, b) => a[filtering] - b[filtering]))
    }
    const classes = useListStyles()

    drivers.sort((a, b) => sortBy === 'NAME' ? (a.name > b.name ? 1 : -1) : (a.rating < b.rating ? 1 : -1))
    return (
        <>
            <Grid container justify={'space-between'} style={{ marginTop: '40px' }}>
                <Typography variant={'h1'}>
                    Drivers
                </Typography>
                <Grid container item alignItems={'center'} style={{ width: 'auto' }}>
                    <TextField
                        style={{ position: 'relative', top: '-9px', marginRight: '10px' }}
                        label="Search"
                        onChange={(e) => filterDrivers(e.target.value)}
                    />
                    <Filter values={['NAME', 'SCORE']} current={sortBy} onChange={setSortBy}/>
                </Grid>
            </Grid>
            <Divider style={{ margin: '0 0 16px 0' }}/>
            <Grid container spacing={2}>
                {drivers && drivers.length > 0 ? drivers.map((driver, idx) => (
                    <Grid
                        item
                        container
                        xs={4}
                        key={idx}
                        onClick={() => history.push(`/users/${driver.id}`)}
                    >
                        <Grid container className={classes.main} alignItems={'center'}>
                            <Avatar style={{backgroundColor: stringToColor(driver.name)}}>{driver.name[0]}</Avatar>
                            <ListItemText
                                primary={driver.name}
                                secondary={`Score: ${driver.rating}`}
                                style={{ marginLeft: '10px' }}
                            />
                        </Grid>
                    </Grid>
                )) : (
                    <Typography
                        variant={'button'}
                        style={{
                            color: 'rgba(0,0,0,0.6)',
                            width: '100%',
                            height: '100px',
                            lineHeight: '100px',
                            textAlign: 'center'
                        }}
                        component={'div'}
                    >
                        No drivers
                    </Typography>
                )}
            </Grid>
        </>
    )
}

export default withRouter(UsersSelection)
