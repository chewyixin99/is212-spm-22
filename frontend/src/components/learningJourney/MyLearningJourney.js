import React from 'react'
import { useParams } from 'react-router-dom'

function MyLearningJourney() {
  const { id } = useParams()

  return (
    <h1>
      My Learning Journey
      {id}
    </h1>
  )
}

export default MyLearningJourney
