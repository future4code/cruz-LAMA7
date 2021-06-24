export class Band {
  readonly id!: string
  name!: string
  music_genre!: string
  responsible!: string

  constructor(props: Omit<Band, 'id'>, id: string) {
    Object.assign(this, props)

    this.id = id
  }

  static toBandModel(user: any): Band {
    const { id, ...props } = user
    return new Band(props, id)
  }
}
