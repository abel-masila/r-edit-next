import React from 'react'
import { useSession } from 'next-auth/react'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Avatar from './Avatar'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox() {
  const { data: session } = useSession()

  const [imageBoxOpen, setImageBoxOpen] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating new post...')
    try {
      //get topics
      const {
        data: { getSubredditByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })
      const subreddit = getSubredditByTopic.length > 0
      if (!subreddit) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })
        const image = formData.postImage || ''
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image: image,
            body: formData.postBody,
            title: formData.postTitle,
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        })
      } else {
        //use existing subreddit
        const image = formData.postImage || ''
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image: image,
            body: formData.postBody,
            title: formData.postTitle,
            subreddit_id: getSubredditByTopic[0].id,
            username: session?.user?.name,
          },
        })
      }
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')
      toast.success('New post created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Something went!', { id: notification })
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className=" sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          disabled={!session}
          {...register('postTitle', { required: true })}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session ? 'Create A post by entering a title' : 'Sign In  to post'
          }
        />
        <PhotographIcon
          className={` h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && 'text-blue-300'
          }`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />
        <LinkIcon className={` h-6 text-gray-300 cursor-pointer`} />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 outline-none p-2"
              type="text"
              placeholder="Text (optional)"
              {...register('postBody')}
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subrredit</p>
            <input
              className="m-2 flex-1 bg-blue-50 outline-none p-2"
              type="text"
              placeholder="i.e reactjs"
              {...register('subreddit', { required: true })}
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL</p>
              <input
                className="m-2 flex-1 bg-blue-50 outline-none p-2"
                type="text"
                placeholder="Optional"
                {...register('postImage')}
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A post Title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}
          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 text-white p-2"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
