import React from 'react'
import Image from 'next/image'
import {
  BeakerIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()

  return (
    <div className="flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          priority
          layout="fill"
        />
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* Search Box */}
      <form className="flex flex-1 items-center space-x-2  border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <SearchIcon className="h6- w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button hidden type="submit"></button>
      </form>
      {/* Menu */}
      <div className="text-gray-500  space-x-2 items-center mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {/* Sign in sign out button */}
      {session ? (
        <div
          className="hidden lg:flex items-center space-x-2 border border-gray-100 cursor-pointer"
          onClick={() => signOut()}
        >
          <div className="relative h-5 w-5  flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1  text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400 ">Sign Out</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          className="hidden lg:flex items-center space-x-2 border border-gray-100 cursor-pointer"
          onClick={() => signIn()}
        >
          <div className="relative h-5 w-5  flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400 ">Sign In</p>
        </div>
      )}
    </div>
  )
}

export default Header
