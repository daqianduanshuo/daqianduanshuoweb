
import Layout from '../../components/Layout'
import  { useState, useEffect,useCallback,useRef} from 'react'
import { queryArticleByID } from '../../api/articleapi'
import { useRouter } from 'next/router'
import style from './[id].module.css'
import { Tag  } from 'antd'

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


const ArticelDetail = () => {

  const router = useRouter()
  const [articleid, setArticledId] = useState<any>(null);
  const [data, setData] = useState({title:''})
  const [videos,setVideos] = useState({bilibili:'',xigua:'',zhihu:''})
  const [tags, setTags] = useState([])
  const [content, setContent] = useState("")
  const contentRef = useRef(null)
  
  useEffect(() => {
    const {id} = router.query
    if(id != undefined && id != ""){
      setArticledId(id)
    }
  }, [router])

  const getArticleById = useCallback(async () => {
      if(articleid != "" && articleid != null && articleid != undefined){
        const result = await queryArticleByID(articleid)
        setData(result.data.data)
        setValues(result.data.data)   
      }
  }, [articleid])

  const setValues = (data:any) => {
    let videos = JSON.parse(data.videos)
    setVideos({
      zhihu: decodeURIComponent(videos.zhihu),
      xigua: decodeURIComponent(videos.xigua),
      bilibili: decodeURIComponent(videos.bilibili),
    })
    setContent(data.content)
    setTags(data.tags)
  }
  useEffect(() => {
    getArticleById()
  }, [getArticleById])

  const highlight = () => {
    if(content != ""){
      const nodes = contentRef.current.querySelectorAll('pre');
      nodes.forEach((node) => {
        if (typeof window !== 'undefined') {
          hljs.highlightBlock(node);
        }
      })
    }
  }
  useEffect(() => {
    highlight()
  }, [content])

  return (
    
    <Layout title={data.title}>
      <div className={style.container}>
        <h1>{data.title}</h1> 
        <div className={style.videowrap}>
          <iframe src={videos.bilibili} width='100%' height='100%'></iframe>
        </div>
        <div className={style.social}>
          <span>去其他平台观看: </span>
          <a href={videos.xigua} target="_blank"><img src="/xigua.png" alt="xigua"/></a>  
          <a href={videos.zhihu} target="_blank"><img src="/zhihu.png" alt="zhihu"/></a>
        </div>
        <div className={style.contentwrap}>
          <h2>内容概要:</h2>
          <div ref={contentRef} className={style.content} dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
        <div className={style.tagswrap}>
          {tags.map((tag,index) => {
            return <Tag color="#007FFF" visible key={index}>{tag.tagname}</Tag>
          })}
        </div>
      </div>
    </Layout>
  
  )
}

export default ArticelDetail

