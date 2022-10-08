import { useEffect, useState } from 'react'
import { RESPONSE_CODES } from '../../constants'

const ENDPOINT = 'http://localhost:5001'

const useRolesLoader = (roleId = null, isAbbreviated = false, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [roleData, setRoleData] = useState([])

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      if (roleId) {
        setRoleData([response?.data])
      } else if (isAbbreviated) {
        setRoleData(response?.data?.roles.slice(0, 6))
      } else {
        setRoleData(response?.data?.roles)
      }
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setRoleData([])
    }
  }

  const loadRoles = () => {
    // console.log('---> loadRoles()')
    setIsLoading(true)
    fetch(roleId ? `${ENDPOINT}/roles/${roleId}` : `${ENDPOINT}/roles`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useRolesLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
      })
      .catch((e) => {
        setError(e)
      })
      .finally(setIsLoading(false))
  }

  const reloadData = () => loadRoles() // TODO: Not tested yet

  useEffect(() => {
    loadRoles()
  }, [roleId, init])

  return [roleData, isLoading, error, reloadData]
}

export default useRolesLoader
