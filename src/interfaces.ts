interface QuizData {
  title: string
  subtitle: string
  quizId: string
  content: Content[]
  answers: Answer[]
}

interface Content {
  id: number
  questions: QuestionType[]
  text: string
}

interface QuestionType {
  text: string
  image: string
  alt: string
  credit: string
}

interface Answer {
  text: string
  image: string
  combination: string[]
}

export type { QuizData, Content, Answer, QuestionType }
