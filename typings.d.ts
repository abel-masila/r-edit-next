type CommentList = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

type VoteList = {
  created_at: string
  id: number
  post_id: number
  upvote: boolean
  username: string
}
type Subrredit = {
  created_at: string
  id: number
  topic: string
}
type Post = {
  body: string
  created_at: string
  id: number
  image: string
  title: string
  subreddit_id: number
  username: string
  commentList: CommentList[]
  voteList: VoteList[]
  subreddit: Subrredit[]
}
