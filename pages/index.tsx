import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/Header'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit on Web 3.0</title>
      </Head>
      {/* PostBox */}
      <PostBox />
      <div className="flex">{/* Feed */}</div>
    </div>
  )
}

export default Home
