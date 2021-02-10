import React,{useState,useEffect,useCallback,useRef,useMemo} from 'react';
import { history } from 'umi';
import { Form, Input, Button, Tag, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { queryArticleByID,createArticle,updateArticle} from './service';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const ArticleDetail: React.FC = (props) => {
    
    const [form] = Form.useForm()
    const [tags, setTags] = useState([]) 
    const tagRef = useRef(null)
    const editorRef = useRef(null)
    const [content, setContent] = useState("")

    const queryArticleByIDCallback = useCallback(async () => {
        if(props.location.query.id){
            const result = await queryArticleByID({id:props.location.query.id})
            updateForm(result.data)
        }
    }, [props.location.query.id])

    const updateForm = (data:any) => {
        let videos = JSON.parse(data.videos)
        form.setFieldsValue({
            title: data.title,
            zhihu: decodeURIComponent(videos.zhihu),
            xigua: decodeURIComponent(videos.xigua),
            bilibili: decodeURIComponent(videos.bilibili),
        })
        setContent(data.content)
        setTags(data.tags)
    }

    const handleCloseTag = (index:number) =>{
        let tagsCopy = [...tags];
        tagsCopy.splice(index, 1)
        setTags(tagsCopy)
    }
    const handleEditInputConfirm = (e) =>{
        e.preventDefault()
        let tagsCopy = [...tags];
        tagsCopy.push({"tagname":tagRef.current.state.value})
        setTags(tagsCopy)
        tagRef.current.state.value = ""
    }

    useEffect(() => {
        queryArticleByIDCallback()
    }, [queryArticleByIDCallback])

    const imageHandler = () => {
        console.log('ref',editorRef)
        var editor = editorRef.current.getEditor();
        var range = editorRef.current.getEditorSelection().index;
        var value = prompt('What is the image URL');
        editor.insertEmbed(range, 'image', value);
    }

    const modules = useMemo(() => ({
        toolbar: {
        container: [
            [{ 'header': [1, 2, false] }],
                    ['bold',  'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link','image'],
                    ['code-block']
        ],
        handlers: {
            image: imageHandler
            }
        }
    }), [])



    
    
    const onFinish = async (values: any) => {
        let id = props.location.query.id
        
        let videos = {  "zhihu":encodeURIComponent(values.zhihu),
                        "xigua":encodeURIComponent(values.xigua),
                        "bilibili":encodeURIComponent(values.bilibili)
                        }
        let params = {"title":values.title,"videos":JSON.stringify(videos),"tags":tags,"content":content}
        if(id){
            await updateArticle(id,params)
            message.success('编辑成功')
        }else{
            await createArticle(params)
            message.success('添加成功')
            setTags([])
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
                <Form.Item name="zhihu" label="知乎链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="xigua" label="西瓜链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="bilibili" label="B站链接" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="内容概要">
                    <ReactQuill ref={editorRef} theme="snow" modules={modules} value={content} onChange={setContent}/>
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