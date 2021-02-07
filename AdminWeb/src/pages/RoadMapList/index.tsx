import { Button,Table, } from 'antd'
import React, { useState, useEffect,useCallback} from 'react';
import { queryroadmaps} from './service';
import { history } from 'umi';

const RoadMapList: React.FC = () => {

  const [data, setData] = useState([])

  const getRoadMaps = useCallback(async () => {
    const result = await queryroadmaps({type:""})
    setData(result.data)
  }, [])
  
  useEffect(() => {
    getRoadMaps()
  }, [getRoadMaps])

  const columns = [
    {title: '标题', dataIndex: 'title', key: 'title'},
    {title: '权重', dataIndex: 'weight', key: 'weight'},
    {title: '操作', dataIndex: 'id', render: (_, record:any) => 
      <Button type="primary"  onClick={() => {
        history.push('/roadmap/detail?id=' + record.id)
      }}>
      编辑路线图
    </Button>},
  ]

  return (
    <div>
      <Button type="primary" style={{ marginBottom:'10px'}}  onClick={() => {
        history.push('/roadmap/detail');
      }}>
        创建路线图
      </Button>
      <Table  dataSource={data.lists} 
              rowKey={item => item.title}
              columns={columns} 
              pagination={false}
      />
    </div>
  )
}
export default RoadMapList


