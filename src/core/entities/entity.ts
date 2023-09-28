import { randomUUID } from 'node:crypto'

export class Entity<Props> {
  private readonly _id: string
  protected props: Props

  get id (): string {
    return this._id
  }

  constructor (props: any, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}
