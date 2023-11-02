import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able ro comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
