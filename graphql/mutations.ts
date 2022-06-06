import { gql } from '@apollo/client'
export const ADD_POST = gql`
  mutation addPost(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      id
      body
      created_at
      image
      title
      subreddit_id
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation addSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
