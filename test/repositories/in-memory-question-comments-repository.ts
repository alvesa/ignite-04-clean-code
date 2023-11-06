import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComments: QuestionComment): Promise<void> {
    this.items.push(questionComments)
  }

  async delete(question: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<QuestionComment> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    return questionComment as QuestionComment
  }
}
