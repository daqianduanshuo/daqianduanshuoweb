
import { queryArticles } from './service'
import React, { useState, useEffect,useCallback} from 'react';
import { Pagination } from 'antd';
import style from './index.module.css'
import {transTime} from '../../utils/index'
const ArticelList = ({  }) => {

  const [data, setData] = useState({lists:[],total:0})
  const [pageIndex, setPageIndex] = useState(1)

  const getArticles = useCallback(async () => {
    const result = await queryArticles({pageIndex:pageIndex,pageSize:10})
    console.log('result',result.data.data)
    setData(result.data.data)
  }, [pageIndex])

  const onChangePage = (page, pageSize) =>{
    console.log(page,pageSize)
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
            <p>{item.title}</p>
            <span>发布时间: {transTime(item.create_at)}</span>
          </div>
          )
      })}
      <Pagination className={style.pagination} onChange={onChangePage} current={pageIndex} total={data.total} />
    </div>
  )
}


export default ArticelList

