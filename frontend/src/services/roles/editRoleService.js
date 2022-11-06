import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const editRoleService = async ({
  roleId,
  roleName,
  roleDesc,
  roleDept,
  roleStatus,
  skills,
}) => {
  const requestBody = JSON.stringify({
    role_name: roleName,
    role_desc: roleDesc,
    role_dept: roleDept,
    status: roleStatus,
    skills,
  })
  // console.log('---> editRoleService, props: ', requestBody)

  const result = {
    data: null,
    error: null,
  }

  try {
    const response = await fetch(`${ENDPOINT}/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    const responseJSON = await response.json()
    // console.log('---> editRoleService, responseJSON: ', responseJSON)

    if (responseJSON.code === RESPONSE_CODES.SUCCESS) {
      result.data = responseJSON.data
    } else {
      result.error = responseJSON.message
    }
  } catch (e) {
    console.log('editRoleService, error: ', e)
    result.error = 'Unable to edit role. Please try again later.'
  }

  return result
}

export default editRoleService
