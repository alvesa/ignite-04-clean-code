import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComments: QuestionComment): Promise<void> {
    this.items.push(questionComments)
  }

  async findManyRecent({ page }: PaginationParams): Promise<QuestionComment[]> {
    const questionComments = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }
}
