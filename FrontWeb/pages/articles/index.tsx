
import { queryArticles } from '../../api/articleapi'
import React, { useState, useEffect,useCallback} from 'react'
import Link from 'next/link'
import { Pagination } from 'antd'
import style from './index.module.css'
import {transTime} from '../../utils/index'

const ArticelList = () => {

  const [data, setData] = useState({lists:[],total:0})

  let tpageIndex 
  if (typeof window !== "undefined"){
    tpageIndex = (sessionStorage.getItem('articlePageIndex')) || 1
  }

  const [pageIndex, setPageIndex] = useState( tpageIndex )

  const getArticles = useCallback(async () => {
    const result = await queryArticles({pageIndex:pageIndex,pageSize:10})
    setData(result.data.data)
  }, [pageIndex])

  const onChangePage = (page, pageSize) =>{
    if (typeof window !== "undefined") {
      sessionStorage.setItem('articlePageIndex',page)      
    }
    setPageIndex(page)
  }
  
  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <div className={style.cellwrap}>
      {data.lists.map((item,index) => {
          return (
          <div key={index} className={style.cell}>
            <Link href="/articles/[id]" as={`/articles/${item.id}`}>
              <div> <p>{item.title}</p>  <span>发布时间: {transTime(item.create_at)}</span></div>
            </Link>
          </div>
          )
      })}
      <Pagination className={style.pagination} onChange={onChangePage} current={parseInt(pageIndex)} total={data.total} />
    </div>
  )
}


export default ArticelList

