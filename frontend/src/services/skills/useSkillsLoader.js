import { useEffect, useState } from 'react'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const useSkillsLoader = (numRows = -1, skillsId = null, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [skillsData, setSkillsData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      setTotal(response.data.skills.length)
      if (skillsId) {
        setSkillsData([response?.data])
      } else if (numRows === -1) {
        setSkillsData(response?.data?.skills)
      } else {
        setSkillsData(response?.data?.skills.slice(0, numRows))
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
        console.log('---> useSkillsLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e)
        setIsLoading(false)
      })
  }

  const reloadData = () => loadSkills() // TODO: Not tested yet

  useEffect(() => {
    loadSkills()
  }, [skillsId, init])

  return [skillsData, isLoading, total, error, reloadData]
}

export default useSkillsLoader
