import { request } from 'umi';

export type Params = {  
    id: number;
};
export async function queryArticleByID(params: Params) {
    return request('/admin/articles/' + params["id"]);
}