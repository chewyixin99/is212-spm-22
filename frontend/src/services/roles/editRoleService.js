import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const editRoleService = async ({ roleId, roleName, roleDesc, roleStatus }) => {
  console.log(
    '---> editRoleService, props: ',
    roleId,
    roleName,
    roleDesc,
    roleStatus
  )
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
      body: JSON.stringify({
        role_name: roleName,
        role_desc: roleDesc,
        status: roleStatus,
      }),
    })

    const responseJSON = await response.json()
    // console.log('---> editRoleService, responseJSON: ', responseJSON)

    if (responseJSON.code === RESPONSE_CODES.SUCCESS) {
      result.data = responseJSON.data
    } else {
      result.error = responseJSON.message
    }
  } catch (e) {
    result.error = e
  }

  return result
}

export default editRoleService
