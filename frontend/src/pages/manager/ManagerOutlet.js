import React from 'react'
import { Outlet } from 'react-router-dom'
import { ROLES } from '../../constants'

function ManagerOutlet() {
  const role = JSON.parse(localStorage.getItem('role'))
  const staffId = JSON.parse(localStorage.getItem('staffId'))
  return <Outlet context={{ role: role, staffId: staffId }} />
}

export default ManagerOutlet
