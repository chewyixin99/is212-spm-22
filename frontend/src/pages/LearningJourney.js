
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const handleCloseNavMenu = () => {
    console.log("hi");
  };
const LearningJourney = () => {
    const { id } = useParams()
    const obj = useOutletContext()

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
        <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
              mr: 2,
              my: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Learning Journey
          </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                component={Link}
                to='new'
            >
              <AddIcon/>
            </IconButton>
            
      <Stack spacing={2}>
        <Item component={Link} to='1'>Journey to be a Manager 1</Item>
        <Item component={Link} to='2'>Journey to be a Manager 2</Item>
        <Item component={Link} to='3'>Journey to be a Consultant 1</Item>
      </Stack>
    </Box>
  )
}

export default LearningJourney

