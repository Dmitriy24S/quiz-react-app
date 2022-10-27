import React from 'react'
import { QuizData } from '../interfaces'

const Title = ({
  title,
  subtitle
}: {
  title: QuizData['title'] | undefined
  subtitle: QuizData['subtitle'] | undefined
}) => {
  return (
    <div className='quiz-title'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default Title
