import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID
  protected props: Props

  get id(): UniqueEntityID {
    return this._id
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected constructor(props: any, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID(id)
  }
}
