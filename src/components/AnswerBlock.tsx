import React, { useEffect, useState } from 'react'
import { Answer } from '../interfaces'

const AnswerBlock = ({
  chosenAnswerItems,
  answerOptions
}: {
  chosenAnswerItems: string[]
  answerOptions: Answer[] | undefined
}) => {
  const [result, setResult] = useState<Answer>()

  // Check if all answer option that got form DB match combination
  useEffect(() => {
    // from db
    answerOptions?.forEach((answer: Answer) => {
      if (
        chosenAnswerItems.includes(answer.combination[0]) &&
        chosenAnswerItems.includes(answer.combination[1]) &&
        chosenAnswerItems.includes(answer.combination[2])
      ) {
        setResult(answer)
      }
    })
  }, [])

  console.log('result:', result)
  // result: {alt: 'blue cheese', combination: Array(3), image: 'https://images.unsplash.com/photo-1452195100486-9c…XxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60', text: 'Blue Cheese'}

  return (
    <div className='answer-block' id='answer-block'>
      <img src={result?.image} alt={result?.text} />
      <h2>{result?.text}</h2>
    </div>
  )
}

export default AnswerBlock
