import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import { STATUS } from '../../constants'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ActionMenu from '../common/ActionMenu'

const CoursesTableRow = ({ courseInfo }) => {
  const navigate = useNavigate()
  const { role } = useOutletContext()
  const {
    course_id,
    course_name,
    course_desc,
    course_status,
    course_type,
    course_category,
  } = courseInfo
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        navigate(`/${role.toLowerCase()}/courses/${course_id}`)
      },
    },
  ]

  let textColor
  if (course_status === STATUS.RETIRED) {
    textColor = 'red'
  } else if (course_status === STATUS.PENDING) {
    textColor = 'orange'
  } else {
    textColor = 'green'
  }

  return (
    <TableRow>
      <TableCell>{course_id}</TableCell>
      <TableCell>{course_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{course_status}</TableCell>
      <TableCell align="right">
        <ActionMenu variant="kebab" menuItemConfigs={actionMenuConfigs} />
      </TableCell>
    </TableRow>
  )
}

CoursesTableRow.propTypes = {
  courseInfo: propTypes.shape({
    course_id: propTypes.string,
    course_name: propTypes.string,
    status: propTypes.string,
  }),
}

export default CoursesTableRow
