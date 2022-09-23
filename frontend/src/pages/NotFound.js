import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

  return (
    <>
    <h1>Page Not Found: Error 404</h1>
    <Button component={Link} to="/">Go To Login Page</Button>
    </>
  )
}

export default NotFound