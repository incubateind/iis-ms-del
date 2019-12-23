import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useHistory } from 'react-router-dom'
import DateRange from '@material-ui/icons/DateRange'
import { DatePicker } from '@material-ui/pickers'


const trips = [
    { id: 1, timestamp: new Date(), duration: '8h' },
    { id: 2, timestamp: new Date(), duration: '8h' },
    { id: 3, timestamp: new Date(), duration: '8h' },
    { id: 4, timestamp: new Date(), duration: '8h' },
    { id: 5, timestamp: new Date(), duration: '8h' },
    { id: 6, timestamp: new Date(), duration: '8h' },
    { id: 7, timestamp: new Date(), duration: '8h' },
]

const Header = ({ current, onChange, username }) => {
    const [anchor, setAnchor] = useState(null)
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const history = useHistory()

    const formatDate = date => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    return (
        <>
            <Grid container alignItems={'center'} justify={'space-between'}>
                <Grid container item alignItems={'center'} style={{ width: 'auto' }}>
                    <IconButton style={{ marginRight: '16px' }} onClick={() => history.push('/')}>
                        <KeyboardArrowLeft/>
                    </IconButton>
                    <Typography variant={'h1'}>
                        {username}
                    </Typography>
                    <IconButton size={'small'} style={{ marginLeft: '32px' }} onClick={() => setDatePickerOpen(true)}>
                        <DateRange/>
                    </IconButton>
                    <Typography variant={'button'} style={{ marginLeft: '10px' }}>
                        {current ? formatDate(current) : 'All'}
                    </Typography>
                    <DatePicker
                        disableFuture
                        open={datePickerOpen}
                        onClose={() => setDatePickerOpen(false)}
                        onChange={onChange}
                        TextFieldComponent={() => null}
                    />
                </Grid>
                {/*<Button*/}
                {/*    onClick={e => setAnchor(e.currentTarget)}*/}
                {/*    endIcon={<KeyboardArrowDown/>}*/}
                {/*>*/}
                {/*</Button>*/}
                <Menu
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                    anchorEl={anchor}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transitionDuration={0}
                >
                    {trips.map(t => (
                        <MenuItem onClick={() => history.push(`/trips/${t.id}`)} key={t.duration}>
                            {t.timestamp.toString()} {t.duration}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Divider style={{ margin: '16px 0' }}/>
        </>
    )
}

export default Header
