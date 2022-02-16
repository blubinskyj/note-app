export interface User {
  email: string
  password: string,
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

export interface UpdateGroup {
  id: string,
  name: string
}

export interface DeleteNote {
  id: string,
  groupId: string
}

export type StoreData = {
  firstName: string
  lastName: string
  email: string
  password: string
  selectedGroupId: string
  selectedNoteId: string
  groups: Group[]
  content: string
}

export type Note = {
  "createdAt": string,
  "content": string,
  "_id": string
  "userId": string
}

export type Group = {
  "_id": string,
  "userId": string,
  "name": string,
  "notes": Note[],
}

export type Response<T> = {
  error: Boolean,
  data: T
}

export type CreateGroupResponse = Response<{
  group: Group
}>

export type DeleteGroupResponse = Response<{
  id: string
}>

export type UpdateGroupResponse = Response<{
  id: string
}>

export type DeleteNoteResponse = Response<{
  id: string
}>

export type UpdateNoteResponse = Response<{
  id: string
}>

export type CreateNoteResponse = Response<{
  id: string
  content: string
  createdAt: string
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

export type AllNotesResponse = Response<{
  notes: Note[]
}>

export type AllGroupsResponse = Response<{
  groups: Group[]
}>
