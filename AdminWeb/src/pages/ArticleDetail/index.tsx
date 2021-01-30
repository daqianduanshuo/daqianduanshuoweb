import React,{useState,useEffect,useCallback,useRef} from 'react';
import { history } from 'umi';
import { Form, Input, Button, Tag } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { queryArticleByID} from './service';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const ArticleDetail: React.FC = (props) => {
    
    const [form] = Form.useForm()
    const [tags, setTags] = useState([]) 
    const tagRef = useRef(null)
    const [content, setContent] = useState('');

    const queryArticleByIDCallback = useCallback(async () => {
        if(props.location.query.id){
            const result = await queryArticleByID({id:props.location.query.id})
            updateForm(result.data)
        }
    }, [props.location.query.id])

    const updateForm = (data:any) => {
        form.setFieldsValue({
            title: data.title
        })
        setTags(data.tags)
    }

    const handleCloseTag = (index:number) =>{
        let tagsCopy = [...tags];
        tagsCopy.splice(index, 1)
        console.log('tags',tagsCopy)
        setTags(tagsCopy)
    }
    const handleEditInputConfirm = () =>{
        let tagsCopy = [...tags];
        tagsCopy.push({"tagname":tagRef.current.state.value})
        setTags(tagsCopy)
        tagRef.current.state.value = ""
    }

    useEffect(() => {
        queryArticleByIDCallback()
    }, [queryArticleByIDCallback])
    
    
    const onFinish = (values: any) => {
        console.log(values,tags,content);
    };
    
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
                <Form.Item name="zhihu" label="知乎链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="xigua" label="西瓜链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="bilibili" label="B站链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="内容概要"  >
                    <ReactQuill theme="snow" value={content} onChange={setContent}/>
                </Form.Item>
                
                <Form.Item label="标签" >
                <Input onPressEnter={handleEditInputConfirm} ref={tagRef}/>
                {tags.map((tag,index) => {
                    return <Tag  visible closable key={index} onClose={() => handleCloseTag(index)} >{tag.tagname}</Tag>
                })
                }
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ArticleDetail