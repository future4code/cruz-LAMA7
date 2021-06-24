export class Show {
  readonly id!: string
  week_day!: string
  start_time!: number
  end_time!: number
  band_id!: string

  constructor(props: Omit<Show, 'id'>, id: string) {
    Object.assign(this, props)

    this.id = id
  }

  static toShowModel(user: any): Show {
    const { id, ...props } = user
    return new Show(props, id)
  }
}
