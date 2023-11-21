import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../../events/answer-created-event'

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
  attachments?: AnswerAttachmentList
}

export class Answer extends AggregateRoot<AnswerProps> {
  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get attachments(): AnswerAttachmentList | undefined {
    return this.props.attachments
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Answer {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
