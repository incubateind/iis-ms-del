import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Button from '@material-ui/core/Button'

const defaultValues = [
    'LAST YEAR',
    'LAST MONTH',
    'LAST WEEK'
]

const Filter = ({ current, onChange, values = defaultValues }) => {
    const [anchor, setAnchor] = useState(null)

    const onClose = () => setAnchor(null)

    const onClick = value => {
        onChange(value)
        onClose()
    }

    return (
        <>
            <Button
                endIcon={<KeyboardArrowDown/>}
                style={{ margin: '-18px 0' }}
                onClick={e => setAnchor(e.currentTarget)}
                disableRipple
            >
                <Typography variant={'button'}>
                    {current}
                </Typography>
            </Button>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={onClose}
                transitionDuration={0}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                {values.map(v => (
                    <MenuItem onClick={() => onClick(v)} key={v}>
                        {v}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default Filter
