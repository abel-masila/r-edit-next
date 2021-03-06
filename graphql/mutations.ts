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

export const ADD_COMMENT = gql`
  mutation insertComment($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      id
      post_id
      username
      text
    }
  }
`

export const ADD_VOTE = gql`
  mutation insertVote($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      post_id
      username
      upvote
      created_at
    }
  }
`
