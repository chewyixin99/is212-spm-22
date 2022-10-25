import { useEffect, useState } from 'react'
import { RESPONSE_CODES } from '../../constants'
import { ENDPOINT } from '../../constants'

const useCoursesLoader = (numRows = -1, courseId = null, init = true) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [coursesData, setCoursesData] = useState([])
  const [total, setTotal] = useState(0)

  const setData = (response) => {
    if (response?.code === RESPONSE_CODES.SUCCESS) {
      setTotal(response.data.courses.length)
      if (courseId) {
        setCoursesData([response?.data])
      } else if (numRows == -1) {
        setCoursesData(response?.data?.courses)
      } else {
        setCoursesData(response?.data?.courses.slice(0, numRows))
      }
    } else if (response?.code === RESPONSE_CODES.NOT_FOUND) {
      setCoursesData([])
    }
  }

  const loadCourses = () => {
    // console.log('---> loadCourses()')
    setIsLoading(true)
    fetch(courseId ? `${ENDPOINT}/courses/${courseId}` : `${ENDPOINT}/courses`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log('---> useSkillsLoader, responseJSON: ', responseJSON)
        setData(responseJSON)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e)
        setIsLoading(false)
      })
  }

  const reloadData = () => loadCourses() // TODO: Not tested yet

  useEffect(() => {
    loadCourses()
  }, [courseId, init])

  return [coursesData, isLoading, total, error, reloadData]
}

export default useCoursesLoader
