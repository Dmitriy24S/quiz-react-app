import React, { useEffect, useState } from 'react'
import AnswerBlock from './components/AnswerBlock'
import QuestionsBlock from './components/QuestionsBlock'
import Title from './components/Title'
import { Content, QuizData } from './interfaces'

function App() {
  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
  console.log('chosenAnswerItems:', chosenAnswerItems)
  // chosenAnswerItems: (3) ['Austin', 'Sandwich', 'Modern']
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[] | undefined>([])
  console.log('unansweredQuestionIds:', unansweredQuestionIds)
  // unansweredQuestionIds: (3) [0, 1, 2]
  const [showAnswer, setShowAnswer] = useState(false)

  // Unanswered Question Ids
  useEffect(() => {
    // destructure ids
    const unansweredIds = quiz?.content.map(({ id }: Content) => id)
    setUnansweredQuestionIds(unansweredIds)
  }, [quiz])

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/quiz-item')
        const data = await response.json()
        console.log('fetch data:', data)
        // "answers": [
        //     {
        //         "alt": "blue cheese",
        //         "combination": [
        //             "New York",
        //             "Pizza",
        //             "Traditional"
        //         ],
        //         "image": "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZSUyMGNoZWVzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        //         "text": "Blue Cheese"
        //     },
        //     {
        //         "alt": "blue cheese",
        //         "combination": [
        //             "New York",
        //   ...
        // "quizId": "345m834",
        // "subtitle": "This quiz is not cheesy or anything like that...",
        // "title": "What cheese are you?"
        setQuiz(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // Scroll to highest unanswered id
  useEffect(() => {
    if (unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
        const answerBlock = document.getElementById('answer-block')
        answerBlock?.scrollIntoView({ behavior: 'smooth' })
      }

      const highestId = Math.min(...unansweredQuestionIds)
      console.log('highestId', highestId)
      const highestElement = document.getElementById(String(highestId))
      console.log('highestElement', highestElement)

      highestElement?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [unansweredQuestionIds, chosenAnswerItems, showAnswer])

  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((quiz: Content) => (
        <QuestionsBlock
          key={quiz.id}
          quiz={quiz}
          setChosenAnswerItems={setChosenAnswerItems}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          unansweredQuestionIds={unansweredQuestionIds}
        />
      ))}
      {showAnswer && (
        <AnswerBlock chosenAnswerItems={chosenAnswerItems} answerOptions={quiz?.answers} />
      )}
    </div>
  )
}

export default App
