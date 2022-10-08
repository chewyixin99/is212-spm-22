import { useEffect, useState } from 'react'

const ENDPOINT = 'http://localhost:5001'

const useRolesLoader = (roleId = null, isAbbreviated = false, init = true) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [roleData, setRoleData] = useState([])

  const loadRoles = () => {
    // console.log('---> loadRoles()')
    setIsLoading(true)
    fetch(roleId ? `${ENDPOINT}/roles/${roleId}` : `${ENDPOINT}/roles`)
      .then((data) => data.json())
      .then((responseData) => {
        // console.log('---> useRolesLoader, responseData: ', responseData)
        if (roleId) {
          setRoleData([responseData?.data])
        } else if (isAbbreviated) {
          setRoleData(responseData?.data?.roles.slice(0, 6))
        } else {
          setRoleData(responseData?.data?.roles)
        }
      })
      .catch((e) => {
        setError(e)
      })
      .finally(setIsLoading(false))
  }

  const reloadData = () => loadRoles()

  useEffect(() => {
    loadRoles()
  }, [roleId, init])

  return [roleData, isLoading, error, reloadData]
}

export default useRolesLoader
