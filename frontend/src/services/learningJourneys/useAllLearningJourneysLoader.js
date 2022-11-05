import { useEffect, useState } from 'react'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const useAllLearningJourneysLoader = (numRows = -1, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [learningJourneyData, setLearningJourneyData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      if (numRows === -1) {
        setLearningJourneyData(response?.data?.learning_journeys)
      } else {
        setLearningJourneyData(
          response?.data?.learning_journeys.slice(0, numRows)
        )
      }
      setTotal(response.data.learning_journeys.length)
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setLearningJourneyData([])
    }
  }

  const loadLearningJourneys = () => {
    // console.log('---> loadLearningJourneys()')
    setIsLoading(true)
    fetch(`${ENDPOINT}/learning_journeys`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useAllLearningJourneysLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('---> useAllLearningJourneysLoader, erorr: ', e)
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

export default useAllLearningJourneysLoader
