import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST_BY_POSTID } from '../../graphql/queries'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast from 'react-hot-toast'

type FormData = {
  comment: string
}

function PostPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const { data } = useQuery(GET_POST_BY_POSTID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const [insertComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POSTID, 'getPostById'],
  })

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    //post comment
    const notification = toast.loading('Posting comment...')
    await insertComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: formData.comment,
      },
    })
    setValue('comment', '')
    toast.success('Comment successfully posted!', {
      id: notification,
    })
  }
  const post: Post = data?.getPostByID

  console.log(data)

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register('comment')}
            disabled={!session}
            placeholder={
              session ? 'Write your comment here' : 'Please sign in to comment'
            }
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
          ></textarea>
          <button
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostPage
