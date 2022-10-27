import React, { useRef } from 'react'
import { QuestionType } from '../interfaces'

const Question = ({
  question,
  quizId,
  setChosenAnswerItems,
  setUnansweredQuestionIds,
  unansweredQuestionIds
}: {
  quizId: number
  question: QuestionType
  setChosenAnswerItems: Function
  setUnansweredQuestionIds: Function
  unansweredQuestionIds: number[] | undefined
}) => {
  // text: string
  // image: string
  // alt: string
  // credit: string

  const handleQuestionClick = () => {
    console.log('click answer, unansweredQuestionIds:', unansweredQuestionIds, 'index:', quizId)
    if (unansweredQuestionIds && unansweredQuestionIds.includes(quizId)) {
      setChosenAnswerItems((prevState: string[]) => [...prevState, question.text])
      setUnansweredQuestionIds((prevState: number[]) => prevState.filter((item) => item !== quizId))
      console.log('selected answer')
      const button = answerOptionRef.current
      button?.classList.add('selected')
    } else {
      console.log('already selected')
    }
  }

  const answerOptionRef = useRef<HTMLButtonElement>(null)

  return (
    <button className='question' ref={answerOptionRef} onClick={handleQuestionClick}>
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p className='credit'>
        <a href={question.image}>{question.credit} </a>
        <a href='https://www.unsplash.com'>Unsplash</a>
      </p>
    </button>
  )
}

export default Question
