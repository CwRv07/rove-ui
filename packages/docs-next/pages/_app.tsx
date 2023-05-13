import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { MDXProvider } from '@mdx-js/react'
import DemoBlock from 'components/DemoBlock'
import Layout from 'components/Layout'

import RoveUI from 'rove-ui'
import 'rove-ui/style'

const components = {
  DemoBlock,
  ...RoveUI
}

export default function App({ Component, pageProps }: AppProps & any) {
  return (
    <Layout>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Layout>
  )
}
