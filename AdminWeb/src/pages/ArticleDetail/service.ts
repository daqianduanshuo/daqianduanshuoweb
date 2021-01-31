import { identity } from 'lodash';
import { request } from 'umi';

export type Params = {  
    id: number;
};
export async function queryArticleByID(params: Params) {
    return request('/admin/articles/' + params["id"]);
}

export async function createArticle(params:any) {
    return request('/admin/articles', {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateArticle(id:string,params:any) {
    return request('/admin/articles/' + id, {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}