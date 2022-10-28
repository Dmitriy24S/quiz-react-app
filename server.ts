import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { QuizData } from './src/interfaces'
dotenv.config()

// const PORT = 8000
const app = express()

app.get('/quiz-item', async (req: Request, res: Response) => {
  try {
    // const URL = process.env.URL as string
    const URL =
      'https://89adc942-8307-48a1-a223-05cc75dab113-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/quiz/collections/quirky_quizes'
    const response: AxiosResponse = await axios.get(URL, {
      headers: {
        'X-Cassandra-Token': process.env.TOKEN,
        accept: 'application/json'
      }
    })
    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data['129a3064-1125-4d05-b4f3-43c1094c3013']
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
      // res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_API_URL as string)
      res.send(quizItem)
      //   {
      //     answers: [],
      //     content: [],
      //     quizId: "345m834",
      //     subtitle: "This quiz is not cheesy or anything like that...",
      //     title: "What cheese are you?",
      //     }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to load quiz'
    })
  }
})

// http://localhost:8000/quiz-item
// app.listen(PORT, () => console.log('server is running on port ', PORT))
app.listen(process.env.PORT || 8000, () =>
  console.log('server is running on port ', process.env.PORT || 8000)
)
