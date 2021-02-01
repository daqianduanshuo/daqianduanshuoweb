import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import style from './Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = '大前端说 - 每天分享一篇技术文章' }: Props) => (
  <div className="page">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={style.mainheader}>
      <div className={["container", style.flexr].join(' ')} >
        <img src="/logo.png" alt="logo" className={style.logo} />
        <nav>
          <Link href="/"><a className={style.videolink}>视频</a></Link>
        </nav>
      </div>
    </header>
    <section className={["container", style.flexc].join(' ')}>
      {children}
    </section>
    <footer className={["container", style.footer].join(' ')}>
      <span>Footer</span>
    </footer>
  </div>
)

export default Layout
