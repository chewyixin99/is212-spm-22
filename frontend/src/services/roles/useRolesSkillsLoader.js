import { useEffect, useState } from 'react'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const useRolesSkillsLoader = (roleId, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [skillData, setSkillData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      setSkillData(response.data.skills)
      setTotal(response.data.roles.length)
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setSkillData([])
    }
  }

  const loadSkills = () => {
    // console.log('---> loadSkills()')
    setIsLoading(true)
    fetch(`${ENDPOINT}/roles/${roleId}/skills`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useRolesSkillsLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e)
        setIsLoading(false)
      })
  }

  const reloadData = () => loadSkills()

  useEffect(() => {
    if (init) {
      loadSkills()
    }
  }, [roleId])

  return [skillData, isLoading, total, error, reloadData]
}

export default useRolesSkillsLoader
