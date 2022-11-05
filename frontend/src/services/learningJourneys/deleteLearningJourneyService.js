import { RESPONSE_CODES, ENDPOINT } from '../../constants'

const deleteLearningJourneyService = async (learningJourneyId) => {
  const result = {
    data: null,
    error: null,
  }

  try {
    const response = await fetch(
      `${ENDPOINT}/learning_journeys/${learningJourneyId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const responseJSON = await response.json()
    // console.log('---> deleteLearningJourneyService, responseJSON: ', responseJSON)

    if (responseJSON.code === RESPONSE_CODES.CREATED) {
      // Response for service success: 201
      result.data = true // No data
    } else {
      result.error = responseJSON.message
    }
  } catch (e) {
    console.log('deleteLearningJourneyService, error: ', e)
    result.error = 'Unable to delete learning journey. Please try again later.'
  }

  return result
}

export default deleteLearningJourneyService
