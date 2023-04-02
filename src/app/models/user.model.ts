export interface User {
  id: string,
  username: string,
  email: string,
  password: string,
  roles: []
}

export type signUp = Omit<User, "id" | "roles">

export type signIn = Omit<User, "id" | "username" | "roles">