import React, { useRef } from 'react'
import { Content } from '../interfaces'
import Question from './Question'

const QuestionsBlock = ({
  quiz,
  setChosenAnswerItems,
  setUnansweredQuestionIds,
  unansweredQuestionIds
}: {
  quiz: Content
  setChosenAnswerItems: Function
  setUnansweredQuestionIds: Function
  unansweredQuestionIds: number[] | undefined
}) => {
  const questionRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <h2 id={quiz.id.toString()} className='question-title'>
        {quiz.text}
      </h2>
      <div className='questions-container' ref={questionRef}>
        {quiz.questions.map((question) => (
          <Question
            quizId={quiz.id}
            key={question.text}
            question={question}
            setChosenAnswerItems={setChosenAnswerItems}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
            unansweredQuestionIds={unansweredQuestionIds}
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionsBlock
