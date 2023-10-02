import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content (): string {
    return this.props.content
  }

  set content (content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId (): UniqueEntityID {
    return this.props.authorId
  }

  get questionId (): UniqueEntityID {
    return this.props.questionId
  }

  get createdAt (): Date {
    return this.props.createdAt
  }

  get updatedAt (): Date | undefined {
    return this.props.updatedAt
  }

  get excerpt (): string {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch (): void {
    this.props.updatedAt = new Date()
  }

  static create (props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID): Answer {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)

    return answer
  }
}
