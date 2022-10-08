import React, { useState } from 'react'
import propTypes from 'prop-types'

import { Box, Button, Menu, MenuItem, IconButton } from '@mui/material'
import { MoreVert, KeyboardArrowDown } from '@mui/icons-material'

const ActionMenu = ({ variant, menuName, menuItemConfigs }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const renderButton = () => {
    if (variant === 'kebab') {
      return (
        <IconButton size="small" onClick={handleClick}>
          <MoreVert />
        </IconButton>
      )
    }
    if (variant === 'named') {
      return (
        <Button
          id="demo-customized-button"
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
        >
          {menuName}
        </Button>
      )
    }
  }

  return (
    <Box>
      {renderButton()}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        {menuItemConfigs.map((config, idx) => {
          const onClick = () => {
            config.itemAction()
            handleClose()
          }
          return (
            <MenuItem onClick={onClick} disableRipple key={idx}>
              {config.itemName}
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

ActionMenu.propTypes = {
  variant: propTypes.string,
  menuName: propTypes.string,
  menuItemConfigs: propTypes.arrayOf(
    propTypes.shape({
      itemName: propTypes.string,
      itemAction: propTypes.func,
    })
  ),
}

ActionMenu.defaultProps = {
  variant: 'kebab',
  menuName: 'Options',
}

export default ActionMenu
