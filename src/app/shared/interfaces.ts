export interface User {
  email: string
  password: string,
}

export interface Email {
  email: string
}

export interface Id{
  id: string
}

export interface FullUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface CreateGroup {
  name: string,
  userId: string
}

export type Response<T> = {
  error: Boolean,
  data: T
}

export type CreateGroupResponse = Response<{
  group: Group
}>

export type DeleteGroup = Response<{
  id: Id
}>

export type LoginResponse = Response<{
  emailExists: Boolean
}>

export type AuthResponse = Response<{
  emailExists: Boolean,
  token: string
}>

export type RegisterResponse = Response<{
  user: FullUser
}>

export type NoteResponse = Response<{
  note: Note
}>

export type StoreData = {
  firstName: string
  lastName: string
  email: string
  password: string
  selectedGroupId: string
  selectedNoteId: string
}

export type Note = {
  "createdAt": string,
  "content": string,
  "_id": string
}

export type Group = {
  "_id": string,
  "userId": string,
  "name": string,
  "notes": Note[],
}

export type AllGroupsResponse = Response<{
  groups: Group[]
}>
