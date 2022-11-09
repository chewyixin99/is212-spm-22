import { useEffect, useState } from 'react'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const useRolesLoader = (numRows = -1, roleId = null, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [roleData, setRoleData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      if (roleId !== null) {
        setRoleData([response?.data])
      } else if (numRows === -1) {
        setRoleData(response?.data?.roles)
      } else {
        setRoleData(response?.data?.roles.slice(0, numRows))
      }
      setTotal(response.data.roles.length)
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setRoleData([])
    }
  }

  const loadRoles = () => {
    // console.log('---> loadRoles()')
    setTotal(0)
    setIsLoading(true)
    fetch(roleId ? `${ENDPOINT}/roles/${roleId}` : `${ENDPOINT}/roles`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useRolesLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('---> useRolesLoader, erorr: ', e)
        setError(e)
        setIsLoading(false)
      })
  }

  const reloadData = () => loadRoles()

  useEffect(() => {
    if (init) {
      loadRoles()
    }
  }, [roleId])

  return [roleData, isLoading, total, error, reloadData]
}

export default useRolesLoader
