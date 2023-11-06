import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComments: AnswerComment): Promise<void> {
    this.items.push(answerComments)
  }

  async delete(question: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<AnswerComment> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    return answerComment as AnswerComment
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }
}
