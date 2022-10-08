<<<<<<< Updated upstream:frontend/src/pages/Home.js
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
=======
import React, { useContext, useEffect, useState } from 'react'
import {
  Link
} from 'react-router-dom'

import { styled } from '@mui/material/styles'
import {
  Box,
  Paper,
  Stack,
  Button,
  Grid,
  LinearProgress,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'
import { DUMMYLJDATA } from '../../constants'
import axios from 'axios'

>>>>>>> Stashed changes:frontend/src/pages/staff/StaffHomePage.js

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

<<<<<<< Updated upstream:frontend/src/pages/Home.js
=======
function StaffHomePage() {

const [learningJourneyList, setlearningJourneyList] = useState([])
const [roleList, setRoleList] = useState([])

const getLJData = async (id) => {
  const response = await axios.get(`http://localhost:5001/learning_journeys/${id}`)
  const data = response.data.data
  setlearningJourneyList(data)
}

const getRoleData = async () => {
  const response = await axios.get(`http://localhost:5001/roles`)
  const data = response.data.data.roles
  setRoleList(data)
  console.log(data);
}

useEffect(() => {
  getLJData(1)
  getRoleData()
}, [])
>>>>>>> Stashed changes:frontend/src/pages/staff/StaffHomePage.js

const Home = () => {

  const obj = useOutletContext()
  const [learningJourneyList, setlearningJourneyList] = useState([
    {
      id: 1,
      title: "Learning Journey 1",
      description: "This is a learning journey",
      status: "In Progress",
      progress: 70,
      dateStarted: "2021-10-10",
      role: "HR Manager",
      bannerImg: "https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b",
    },
    {
      id: 2,
      title: "Learning Journey 2",
      description: "This is a learning journey",
      status: "In Progress",
      progress: 35,
      dateStarted: "2021-10-10",
      role: "Operation Manager",
      bannerImg: "https://img.freepik.com/free-vector/female-engineer-standing-near-chalkboard-explaining-project-draft-building-worker-flat-vector-illustration-construction-architecture_74855-8362.jpg?w=1380&t=st=1664982310~exp=1664982910~hmac=8ad3286bfdece15354e78e7135eff2f5432b0e8b33a9fbb8fb1772b33f59ba1b"
    },
    {
      id: 3,
      title: "Learning Journey 3",
      description: "This is a learning journey",
      status: "In Progress",
      progress: 50,
      dateStarted: "2021-10-10",
      role: "IT Manager",
      bannerImg: "https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b",
    },
    {
      id: 4,
      title: "Learning Journey 4",
      description: "This is a learning journey",
      status: "Completed",
      progress: 100,
      dateStarted: "2021-10-10",
      role: "Software Engineer",
      bannerImg: "https://img.freepik.com/free-vector/female-engineer-standing-near-chalkboard-explaining-project-draft-building-worker-flat-vector-illustration-construction-architecture_74855-8362.jpg?w=1380&t=st=1664982310~exp=1664982910~hmac=8ad3286bfdece15354e78e7135eff2f5432b0e8b33a9fbb8fb1772b33f59ba1b"
    }
  ]);
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
      </Typography>
      <Box sx={{ marginBottom: '10vh', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" gutterBottom>
          Learning Journey
        </Typography>
<<<<<<< Updated upstream:frontend/src/pages/Home.js
        <Stack spacing={2} >
          {learningJourneyList.length > 0 ? (learningJourneyList.slice(0, 2).map((item) => (
          <Item key={item.id} component={Link} to={`learning-journey/${item.id}`} sx={{ textDecoration: "none" }} >
            <Grid container spacing={4}>
              <Grid item xs={12} md={10}>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body1" component="div">
                  {item.role}
                </Typography>
                <Typography variant="body1" component="div">
                  {item.status}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem', justifyContent: 'center' }}>
                  <Box sx={{ width: '80%', mr: 1 }}>
                    {
                      item.progress == 100 ? 
                      <LinearProgress variant="determinate" value={item.progress} color="success"/> :
                      <LinearProgress variant="determinate" value={item.progress} />
                    }
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${item.progress}%`}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  object-fit
                  image={item.bannerImg}
                />
              </Grid>
            </Grid>






          </Item>))) : (
=======
        <Stack spacing={2}>
          {learningJourneyList?.length > 0 ? (
            learningJourneyList.slice(0, 2).map((item) => (
              <Item
                key={item?.learning_journey_id}
                component={Link}
                to={`learning-journey/${item?.learning_journey_id}`}
                sx={{ textDecoration: 'none' }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} md={10}>
                    <Typography variant="h5" component="div">
                      {item.learning_journey_name}
                    </Typography>
                    {/* need to have role name */}
                    <Typography variant="body1" component="div">
                      {item.role_id}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ width: '80%', mr: 1 }}>
                        {item.progress === 100 ? (
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                            color="success"
                          />
                        ) : (
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                          />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {`${item.progress}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      object-fit
                      image={item?.bannerImg}
                    />
                  </Grid>
                </Grid>
              </Item>
            ))
          ) : (
>>>>>>> Stashed changes:frontend/src/pages/staff/StaffHomePage.js
            <Typography variant="h5" component="div" gutterBottom>
              No learning journey created.
            </Typography>
          )}
        </Stack>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '10vh' }}
        >

          <Grid item xs={3}>
            <Button variant="outlined" component={Link} to={`learning-journey/`}>View All</Button>
          </Grid>

        </Grid>

      </Box>

      <Box sx={{ marginBottom: '10vh' }}>
        <Typography variant="h4" component="div" gutterBottom>
          Roles
        </Typography>
        <Grid container spacing={4}>
<<<<<<< Updated upstream:frontend/src/pages/Home.js
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                object-fit
                image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  HR Manager
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Human Resource Manager will lead and direct the routine functions of the Human Resources (HR) department
                  including hiring and interviewing staff, administering pay, benefits, and leave, and enforcing company policies and practices.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                object-fit
                image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  HR Manager
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Human Resource Manager will lead and direct the routine functions of the Human Resources (HR) department
                  including hiring and interviewing staff, administering pay, benefits, and leave, and enforcing company policies and practices.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                object-fit
                image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  HR Manager
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Human Resource Manager will lead and direct the routine functions of the Human Resources (HR) department
                  including hiring and interviewing staff, administering pay, benefits, and leave, and enforcing company policies and practices.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                object-fit
                image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  HR Manager
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Human Resource Manager will lead and direct the routine functions of the Human Resources (HR) department
                  including hiring and interviewing staff, administering pay, benefits, and leave, and enforcing company policies and practices.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
=======
          {roleList?.length > 0 ? (
            roleList.map((item) => (
              <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  object-fit
                  image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.role_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The Human Resource Manager will lead and direct the routine
                    functions of the Human Resources (HR) department including
                    hiring and interviewing staff, administering pay, benefits,
                    and leave, and enforcing company policies and practices.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            ))
          ) : (
            <Typography variant="h5" component="div" gutterBottom>
              No roles available.
            </Typography>
          )}
>>>>>>> Stashed changes:frontend/src/pages/staff/StaffHomePage.js
        </Grid>
      </Box>
    </Box>
  )
}

export default Home