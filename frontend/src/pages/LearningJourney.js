
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, CardMedia, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
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
          letterSpacing: '.3rem',
          textDecoration: 'none',
          fontSize: '2rem',
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
        <AddIcon />
      </IconButton>

      <Stack spacing={2}>
        {learningJourneyList.map((item) => (
          <Item key={item.id} component={Link} to={`${item.id}`} sx={{ textDecoration: "none" }} >
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






          </Item>))}

      </Stack>
    </Box>
  )
}

export default LearningJourney

