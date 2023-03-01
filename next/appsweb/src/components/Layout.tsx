import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
              crossOrigin="anonymous"></link>
    </Head>
    <header>
        <nav>
            <Link href="/">Home</Link> | {" "}
            <Link href="/react_hook_form">React Hook Form</Link> | {" "}
            <Link href="/form_control_form">Form Control Form</Link> | {" "}
            <Link href="/i_todos">Todos</Link> | {" "}
            <Link href="/websockets">Todos</Link> | {" "}
        </nav>
    </header>
    <div className={'container'}>
        {children}
    </div>
  </div>
)

export default Layout
