import React,{useState,useEffect,useCallback} from 'react';
import { history } from 'umi';
import { Form, Input, Button, message } from 'antd';
import E from 'wangeditor'
import { queryRoadMapByID,createRoadMap,updateRoadMap} from './service';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const RoadMapDetail: React.FC = (props) => {
    
    const [form] = Form.useForm()
    const [content, setContent] = useState("")
    let editor = new E("#editor")

    const queryArticleByIDCallback = useCallback(async () => {
        if(props.location.query.id){
            const result = await queryRoadMapByID({id:props.location.query.id})
            updateForm(result.data)
        }
    }, [props.location.query.id])

    const updateForm = (data:any) => {
        
        form.setFieldsValue({
            title: data.title,
            type: data.type,
            weight: data.weight
        })
        setContent(data.content)
        editor.txt.html(data.content) 
        
    }

    useEffect(() => {
        queryArticleByIDCallback()
    }, [queryArticleByIDCallback])

    useEffect(() => {
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        editor.create()
        return () => {
            editor.destroy()
        }
    }, [])
    
    
    const onFinish = async (values: any) => {
        let id = props.location.query.id
        
        let params = {"title":values.title,"type":values.type,"weight":values.weight,"content":content}
        if(id){
            await updateRoadMap(id,params)
            message.success('编辑成功')
        }else{
            await createRoadMap(params)
            message.success('添加成功')
            editor.txt.clear()
            setContent("")
            form.resetFields()
        }
    }

    
    return (
        <div>
            <Button type="primary" style={{ marginBottom:'10px'}}  onClick={() => {
                history.goBack();
            }}>
                返回
            </Button>
            <Form  {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="类型" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="weight" label="权重" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="内容概要">
                    <div id="editor"></div>
                </Form.Item>
                
                <Form.Item >
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default RoadMapDetail