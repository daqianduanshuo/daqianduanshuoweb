import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Tooltip } from 'antd';
import style from './Layout.module.css'
import  { useState} from 'react'

type Props = {
  children?: ReactNode
  title?: string,
  index:string
}

const Layout = ({ children, title = '大前端说 - 每天分享一篇技术文章',index }: Props) => {

  const [curindex, setIndex] = useState(index)

  return (
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
          <Link href="/"><a className={[style.link,curindex == "0" ? style.active:null].join(' ')} onClick={() => {setIndex("0")}}>视频</a></Link>
        </nav>
        <nav>
          <Link href="/roadmaps"><a className={[style.link,curindex == "1" ? style.active:null].join(' ')} onClick={() => {setIndex("1")}}>路线图</a></Link>
        </nav>
      </div>
    </header>
    <section className={["container", style.flexc].join(' ')}>
      {children}
    </section>
    <footer className={["container", style.footer].join(' ')}>
      <div className={style.info}>
        <p>Copyright ©2021 大前端说  浙ICP备20004408号</p>
        <div className={style.social}>
          <span>联系我: </span>
          <a href="https://github.com/daqianduanshuo" target="_blank"><img src="/github.png" alt="github"/></a>
          <a href="https://space.bilibili.com/15387274" target="_blank"><img src="/bilibili.png" alt="bilibili"/></a>
          <a href="https://www.ixigua.com/home/3357451803" target="_blank"><img src="/xigua.png" alt="xigua"/></a>
          <a href="https://www.zhihu.com/people/shch" target="_blank"><img src="/zhihu.png" alt="zhihu"/></a>
          <a href="https://weibo.com/u/6574675959" target="_blank"><img src="/sina.png" alt="sina"/></a>
          <Tooltip placement="top" title="wx: meethaowu">
            <a href="" target="_blank"><img src="/wechat.png" alt="wechat"/></a>
          </Tooltip>
      </div>
      </div>
    </footer>
  </div>
  )
}

export default Layout
