import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
  delete(question: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment>
}
