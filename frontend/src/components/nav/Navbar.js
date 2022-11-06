import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
// import AdbIcon from '@mui/icons-material/Adb'
import SchoolIcon from '@mui/icons-material/School'

// const pages = ['Home', 'Learning Journey']
const settings = ['Profile', 'Account', 'Dashboard']

function Navbar({ role }) {
  // TODO: Separate navbar according to roles
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElCompleted, setAnchorElCompleted] = useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleOpenCompleted = (event) => {
    setAnchorElCompleted(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseCompleted = () => {
    setAnchorElCompleted(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LJPS
          </Typography>

          {/* Start of mobile navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, color: 'black', display: 'block' }}
                    component={Link}
                    to={`/${role.toLowerCase()}`}
                  >
                    Home
                  </Button>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, color: 'black', display: 'block' }}
                    component={Link}
                    to={`/${role.toLowerCase()}` + '/roles'}
                  >
                    Roles
                  </Button>
                </Typography>
              </MenuItem>

              {/* {console.log(role)} */}
              {role.toLowerCase() == 'admin' ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 1, color: 'black', display: 'block' }}
                      component={Link}
                      to={`/${role.toLowerCase()}` + '/skills'}
                    >
                      Skills
                    </Button>
                  </Typography>
                </MenuItem>
              ) : (
                <></>
              )}

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1, color: 'black', display: 'block' }}
                    component={Link}
                    to={`/${role.toLowerCase()}` + '/courses'}
                  >
                    Courses
                  </Button>
                </Typography>
              </MenuItem>

              {role.toLowerCase() == 'staff' ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/staff/learning-journey"
                      sx={{ my: 1, color: 'black', display: 'block' }}
                    >
                      Learning Journey
                    </Button>
                  </Typography>
                </MenuItem>
              ) : (
                <></>
              )}

              {role.toLowerCase() == 'staff' ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="completed-courses"
                      sx={{ my: 1, color: 'black', display: 'block' }}
                    >
                      Completed courses
                    </Button>
                  </Typography>
                </MenuItem>
              ) : (
                <></>
              )}

              {role.toLowerCase() == 'staff' ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="completed-skills"
                      sx={{ my: 1, color: 'black', display: 'block' }}
                    >
                      Completed skills
                    </Button>
                  </Typography>
                </MenuItem>
              ) : (
                <></>
              )}
            </Menu>
          </Box>

          {/* End of mobile navbar */}

          {/* Start of desktop navbar */}

          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LJPS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={`/${role.toLowerCase()}`}
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={`/${role.toLowerCase()}` + '/roles'}
            >
              Roles
            </Button>

            {role.toLowerCase() == 'admin' ? (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${role.toLowerCase()}` + '/skills'}
              >
                Skills
              </Button>
            ) : (
              <></>
            )}

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={`/${role.toLowerCase()}` + '/courses'}
            >
              Courses
            </Button>

            {role.toLowerCase() == 'staff' ? (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${role.toLowerCase()}` + '/learning-journey'}
                // id="basic-button"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
              >
                Learning Journey
              </Button>
            ) : (
              <></>
            )}

            {role.toLowerCase() == 'staff' ? (
              <Button
                onClick={handleOpenCompleted}
                sx={{ my: 2, color: 'white', display: 'block' }}
                id="completed-button"
                aria-controls={
                  Boolean(anchorElCompleted) ? 'completed-menu' : undefined
                }
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElCompleted) ? 'true' : undefined}
              >
                My completed
              </Button>
            ) : (
              <></>
            )}

            <Menu
              id="completed-menu"
              anchorEl={anchorElCompleted}
              open={Boolean(anchorElCompleted)}
              onClose={handleCloseCompleted}
              MenuListProps={{
                'aria-labelledby': 'completed-button',
              }}
            >
              <MenuItem
                onClick={handleCloseCompleted}
                component={Link}
                to="completed-courses"
              >
                Courses
              </MenuItem>
              <MenuItem
                onClick={handleCloseCompleted}
                component={Link}
                to="completed-skills"
              >
                Skills
              </MenuItem>
            </Menu>
          </Box>

          {/* End of desktop navbar */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                {role.toLowerCase() == 'admin' ? (
                  <Avatar>HR</Avatar>
                ) : (
                  <Avatar>S</Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem>
                <Typography
                  component={Link}
                  to="/login"
                  textAlign="center"
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  Log Out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Navbar.propTypes = {
  role: PropTypes.string,
}

export default Navbar
