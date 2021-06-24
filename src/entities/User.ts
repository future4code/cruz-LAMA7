export class User {
  readonly id!: string
  name!: string
  email!: string
  password!: string
  role!: UserRole

  constructor(props: Omit<User, 'id'>, id: string) {
    Object.assign(this, props)

    this.id = id
  }

  static stringToUserRole(input: string): UserRole {
    switch (input) {
      case 'NORMAL':
        return UserRole.NORMAL
      case 'ADMIN':
        return UserRole.ADMIN
      default:
        throw new Error('Invalid user role')
    }
  }

  static toUserModel(user: any): User {
    const { id, ...props } = user
    return new User(props, id)
  }
}

export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}
