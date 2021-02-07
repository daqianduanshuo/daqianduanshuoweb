
import Layout from '../../components/Layout'
import React, { useState, useEffect,useCallback} from 'react'
import style from './index.module.css'
import { queryRoadMaps } from '../../api/roadmapsapi'

const ArticelList = () => {

  const [data, setData] = useState({lists:[]})

  const getRoadMaps= useCallback(async () => {
    const result = await queryRoadMaps({type:""})
    setData(result.data.data)
  }, [])

  useEffect(() => {
    getRoadMaps()
  }, [getRoadMaps])

  return (
    <Layout title="前端学习路线图" index="1">
      <div className={style.cellwrap}>
      {data.lists.map((item,index) => {
          return (
          <div className={style.cellwrap} key={index}>
            <div className={style.cell}>
              <h1>{item.title}</h1>
              <div className={style.content} dangerouslySetInnerHTML={{__html: item.content}}></div>
            </div>
          </div>
          )
      })}
      </div>
    </Layout>
  )
}


export default ArticelList

