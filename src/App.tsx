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
        // const response = await fetch('http://localhost:8000/quiz-item')
        // const response = await fetch(`{${process.env.REACT_APP_API_URL}:8000/quiz-item}`)
        const response = await fetch('/.netlify/functions/getData')
        console.log('fetch response', response)
        // ! in server.ts:
        // const quizItem: QuizData = await response.data.data['129a3064-1125-4d05-b4f3-43c1094c3013']
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

        // ! in server.ts:
        // const quizItem: QuizData = await response.data.data['129a3064-1125-4d05-b4f3-43c1094c3013']
        // ! netlify data.data['...']:
        // fetch data:
        // {status: 200, data: {…}}
        // data: 129a3064-1125-4d05-b4f3-43c1094c3013
        // : {answers: Array(67), content: Array(3), quizId: '345m834', subtitle: 'This quiz is not cheesy or anything like that...', title: 'What cheese are you?'}
        // f8cab2c7-c504-4506-af6a-a63101f57c7f
        // : {answers: Array(67), content: Array(3), quizId: '345m834', subtitle: 'This quiz is not cheesy or anything like that...', title: 'What cheese are you?'}
        // status: 200
        setQuiz(data.data['129a3064-1125-4d05-b4f3-43c1094c3013'])
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
