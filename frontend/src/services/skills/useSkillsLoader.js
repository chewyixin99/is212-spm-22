import { useEffect, useState } from 'react'
import { RESPONSE_CODES } from '../../constants'

const ENDPOINT = 'http://localhost:5001'

const useSkillsLoader = (
  skillsId = null,
  isAbbreviated = false,
  init = true
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [skillsData, setSkillsData] = useState([])

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      if (skillsId) {
        setSkillsData([response?.data])
      } else if (isAbbreviated) {
        setSkillsData(response?.data?.skills.slice(0, 6))
      } else {
        setSkillsData(response?.data?.skills)
      }
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setSkillsData([])
    }
  }

  const loadSkills = () => {
    // console.log('---> loadSkills()')
    setIsLoading(true)
    fetch(skillsId ? `${ENDPOINT}/skills/${skillsId}` : `${ENDPOINT}/skills`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useSkillsLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
      })
      .catch((e) => {
        setError(e)
      })
      .finally(setIsLoading(false))
  }

  const reloadData = () => loadSkills() // TODO: Not tested yet

  useEffect(() => {
    loadSkills()
  }, [skillsId, init])

  return [skillsData, isLoading, error, reloadData]
}

export default useSkillsLoader
