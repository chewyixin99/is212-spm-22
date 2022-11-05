import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import { ENDPOINT } from '../../constants'
import CoursesTable from '../../components/course/CoursesTable'
import LearningJourneysTable from '../../components/learningJourney/LearningJourneysTable'

const StaffHomePage = () => {
  const [roleList, setRoleList] = useState([])

  const getRoleData = async () => {
    const response = await axios.get(`${ENDPOINT}/roles`)
    const data = response.data.data.roles
    setRoleList(data)
  }

  useEffect(() => {
    getRoleData()
  }, [])

  return (
    <Box sx={{ margin: 'auto' }}>
      <Box my={5}>
        <LearningJourneysTable staffId={130001} />
      </Box>

      <Box my={5}>
        <CoursesTable numRows={3} />
      </Box>

      <Box my={5} sx={{ marginBottom: '10vh', width: '50%', margin: 'auto' }}>
        <SectionHeader header="Roles" />
        <Grid container spacing={4}>
          {roleList?.length > 0 ? (
            roleList.map((item) => (
              <Grid item xs={12} md={4} key={item.role_id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    // object-fit
                    image="https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.role_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      The Human Resource Manager will lead and direct the
                      routine functions of the Human Resources (HR) department
                      including hiring and interviewing staff, administering
                      pay, benefits, and leave, and enforcing company policies
                      and practices.
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
        </Grid>
      </Box>
    </Box>
  )
}

export default StaffHomePage
