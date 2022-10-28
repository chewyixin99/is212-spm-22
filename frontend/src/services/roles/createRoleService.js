import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const createRoleService = async ({
  roleName,
  roleDesc,
  roleDept,
  roleStatus,
}) => {
  console.log(
    '---> createRoleService, props: ',
    roleName,
    roleDesc,
    roleDept,
    roleStatus
  )
  const result = {
    data: null,
    error: null,
  }

  try {
    const response = await fetch(`${ENDPOINT}/roles/${roleName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role_desc: roleDesc,
        role_dept: roleDept,
        status: roleStatus,
      }),
    })

    const responseJSON = await response.json()
    // console.log('---> createRoleService, responseJSON: ', responseJSON)

    if (responseJSON.code === RESPONSE_CODES.CREATED) {
      result.data = responseJSON.data
    } else {
      result.error = responseJSON.message
    }
  } catch (e) {
    console.log('createRoleService, error: ', e)
    result.error = 'Unable to edit role. Please try again later.'
  }

  return result
}

export default createRoleService
