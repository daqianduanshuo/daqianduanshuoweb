import { Button,Table, } from 'antd'
import React, { useState, useEffect,useCallback} from 'react';
import { queryArticles} from './service';
import { history } from 'umi';

const ArticleList: React.FC = () => {

  const [data, setData] = useState([])
  const [pageIndex, setpageIndex] = useState(1)

  const getArticles = useCallback(async () => {
    const result = await queryArticles({pageIndex:pageIndex,pageSize:10})
    setData(result.data)
  }, [pageIndex])
  
  useEffect(() => {
    getArticles()
  }, [getArticles])

  const columns = [
    {title: '标题', dataIndex: 'title', key: 'title'},
    {title: '创建时间', dataIndex: 'create_at', key: 'create_at'},
    {title: '操作', dataIndex: 'id', render: (_, record:any) => 
      <Button type="primary"  onClick={() => {
        history.push('/article/detail?id=' + record.id)
      }}>
      编辑文章
    </Button>},
  ]

  return (
    <div>
      <Button type="primary" style={{ marginBottom:'10px'}}  onClick={() => {
        history.push('/article/detail');
      }}>
        创建文章
      </Button>
      <Table  dataSource={data.lists} 
              rowKey={item => item.title}
              columns={columns} 
              pagination={{
              current:pageIndex,
              total:data.total,
              pageSize:10,
              onChange:(current,_)=>{
                setpageIndex(current)
              }
            }}
      />
    </div>
  )
}
export default ArticleList


