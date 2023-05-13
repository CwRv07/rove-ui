import React, { ReactElement } from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="mx-auto h-full flex flex-col justify-around max-w-5xl">
      <h1 className="font-extrabold text-5xl mt-8">RoveUI 组件库</h1>
      <p className="my-5 text-lg  mb-2 text-gray-600 ">基于UnoCSS搭建的React组件库</p>
      <div>
        <Link
          href="/docs/button"
          className="inline-block mt-2 p-3 px-10 bg-blue-500 text-white text-lg rounded-full shadow-md hover:bg-blue-400"
        >
          快速开始
        </Link>
      </div>
    </div>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>
}
