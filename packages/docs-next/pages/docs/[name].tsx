import React, { useEffect } from 'react'
import path from 'path'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'
import rehpyToc, { Options as RehpyTocOptions, HtmlElementNode } from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrismPlus from 'rehype-prism-plus'

import SideMenu from 'components/SideMenu'
import TocMenu from 'components/TocMenu'
import { InferGetServerSidePropsType, GetStaticPropsContext } from 'next'

const data = [{ name: 'Button 按钮', slug: 'button' }]

type Props = InferGetServerSidePropsType<typeof getStaticProps>

function extract(obj: { value?: string; children?: any[] }, arr: string[] = []) {
  if (obj.children) {
    obj.children.map((item) => {
      extract(item)
    })
  } else {
    arr.push(obj.value || '')
  }
  return arr
}

export default function Page({ source, tocElement }: Props) {
  const tocList = extract(tocElement)
  const [id, setId] = React.useState(tocList[0])
  useEffect(() => {
    let isMounted = true
    let arrayElement: { offsetTop: number; id: string }[]
    let onScrollTrue: () => void
    function onScroll(arrayElement: { offsetTop: number; id: string }[]) {
      return () => {
        let selectId: string | undefined
        arrayElement.forEach((item) => {
          if (item.offsetTop <= document.documentElement.scrollTop) {
            selectId = item.id
          }
        })
        if (isMounted && selectId) setId(selectId)
      }
    }
    setTimeout(() => {
      arrayElement = tocList.map((item) => {
        // console.log(document.getElementById(item).offsetTop + 54)
        return { offsetTop: (document.getElementById(item)?.offsetTop ?? 0) + 56, id: item }
      })
      onScrollTrue = onScroll(arrayElement)
      window.addEventListener('scroll', onScrollTrue)
    }, 1000)
    return () => {
      isMounted = false
      window.removeEventListener('scroll', onScrollTrue)
    }
  }, [tocList])
  return (
    <div className="flex w-full relative">
      <SideMenu data={data} />
      <div className="prose flex-1  p-5 rounded-lg dark:bg-[#222222] box-shadow bg-white">
        <MDXRemote {...source} />
      </div>
      <div className="xl:block hidden min-w-fit px-10">
        <div className="sticky top-24 p-5 rounded-lg dark:bg-[#222222] box-shadow bg-white">
          <h3 className="text-xl text-gray-900 dark:text-gray-100 dark:opacity-90 font-bold pb-4">目录</h3>
          <TocMenu idTable={id} {...tocElement}></TocMenu>
        </div>
      </div>
    </div>
    // <div className="flex gap-10">
    //   <SideMenu data={data} />
    //   <div className="prose flex-auto max-w-full">
    //     <MDXRemote {...source} />
    //   </div>
    //   <div className="xl:block hidden">
    //     <div className="sticky top-24 p-5 rounded-lg dark:bg-[#222222] box-shadow bg-white">
    //       <h3 className="text-xl text-gray-900 dark:text-gray-100 dark:opacity-90 font-bold pb-4">目录</h3>
    //       <TocMenu idTable={id}>{tocElement as any}</TocMenu>
    //     </div>
    //   </div>
    // </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { name: 'button' } }, { params: { name: 'user-select' } }, { params: { name: 'login' } }],
    fallback: false // SSG 模式
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ name: string }>) {
  let tocElement: HtmlElementNode = {} as HtmlElementNode
  const { name = '' } = params || {}
  const source = String(fs.readFileSync(path.join(process.cwd(), 'docs', name, 'index.mdx')))
  const mdxSoutce = await serialize(source, {
    scope: {},
    mdxOptions: {
      recmaPlugins: [remarkGfm, remarkMath, remarkFootnotes],
      rehypePlugins: [
        rehypeSlug,
        rehypePrismPlus,
        [
          rehpyToc,
          {
            headings: ['h2', 'h3', 'h4'],
            customizeTOC: (toAll) => {
              tocElement = toAll
              return false
            }
          } as RehpyTocOptions
        ]
      ]
    },
    parseFrontmatter: true
  })
  return {
    props: {
      source: mdxSoutce,
      tocElement
    } // 传递给组件的props
  }
}
