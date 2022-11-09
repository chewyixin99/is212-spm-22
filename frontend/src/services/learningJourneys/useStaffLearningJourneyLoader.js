import { useEffect, useState } from 'react'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const useStaffLearningJourneyLoader = (staffId, numRows = -1, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [learningJourneyData, setLearningJourneyData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      if (numRows === -1) {
        setLearningJourneyData(response?.data)
      } else {
        setLearningJourneyData(response?.data.slice(0, numRows))
      }
      if (response?.data) {
        setTotal(response?.data.length)
      }
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setLearningJourneyData([])
    }
  }

  const loadLearningJourneys = () => {
    // console.log('---> loadLearningJourneys()')
    setIsLoading(true)
    setTotal(0)
    fetch(`${ENDPOINT}/learning_journeys/${staffId}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useStaffLearningJourneyLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('---> useStaffLearningJourneyLoader, erorr: ', e)
        setError(e)
        setIsLoading(false)
      })
  }

  const reloadData = () => loadLearningJourneys()

  useEffect(() => {
    if (init) {
      loadLearningJourneys()
    }
  }, [])

  return [learningJourneyData, isLoading, total, error, reloadData]
}

export default useStaffLearningJourneyLoader
