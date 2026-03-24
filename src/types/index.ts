export interface Comment {
  id: string
  postId: string
  text: string
  createdAt: number
}

export interface Post {
  id: string
  text: string
  createdAt: number
}
