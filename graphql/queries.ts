import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query getSubredditByTopic($topic: String!) {
    getSubredditByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getPostList {
      body
      id
      created_at
      image
      title
      subreddit_id
      username
      commentList {
        id
        text
        post_id
        username
        created_at
      }
      voteList {
        id
        upvote
        post_id
        username
        created_at
      }
      subreddit {
        id
        topic
        created_at
      }
    }
  }
`
