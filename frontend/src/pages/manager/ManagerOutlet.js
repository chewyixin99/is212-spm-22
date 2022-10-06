import React from 'react'
import { Outlet } from 'react-router-dom'
import { ROLES } from '../../constants'

function ManagerOutlet() {
  return <Outlet context={{ role: ROLES.MANAGER }} />
}

export default ManagerOutlet
