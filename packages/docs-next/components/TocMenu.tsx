import c from 'classnames'
import React, { FC } from 'react'
import { HtmlElementNode } from '@jsdevtools/rehype-toc'

interface Props extends Partial<HtmlElementNode> {
  idTable: string
  key?: number
  value?: string
}

const TocMenu: FC<Props> = (props) => {
  switch (props.tagName) {
    case 'nav': {
      return (
        <nav {...props.properties}>
          {props.children &&
            props.children.map((item: any, index) => {
              return <TocMenu {...item} key={index} idTable={props.idTable} />
            })}
        </nav>
      )
    }
    case 'ol': {
      return (
        <ol {...props.properties}>
          {props.children &&
            props.children.map((item: any, index) => {
              return <TocMenu {...item} key={index} idTable={props.idTable} />
            })}
        </ol>
      )
    }
    case 'li': {
      return (
        <li {...props.properties}>
          {props.children &&
            props.children.map((item: any, index) => {
              return <TocMenu {...item} key={index} idTable={props.idTable} />
            })}
        </li>
      )
    }
    case 'a': {
      return (
        <a
          {...props.properties}
          className={c(
            'block py-1 text-sm font-medium hover:text-[#428dcc] focus:outline-none dark:hover:text-gray-200 focus-visible:text-gray-700 dark:opacity-90 dark:focus-visible:text-gray-200 text-gray-400',
            props.properties && props.properties.href == '#' + props.idTable && 'text-[#428dcc] dark:text-gray-200'
          )}
        >
          {props.children &&
            props.children.map((item: any, index) => {
              return <TocMenu {...item} key={index} />
            })}
        </a>
      )
    }
    default:
      return <>{props.value}</>
  }
}

export default TocMenu
