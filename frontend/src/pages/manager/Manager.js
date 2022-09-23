import React from 'react'
import { Outlet } from 'react-router-dom'

const Manager = () => {
  return (
    <>
        <Outlet context={{role: 'manager'}}/>
    </>
  )
}

export default Manager