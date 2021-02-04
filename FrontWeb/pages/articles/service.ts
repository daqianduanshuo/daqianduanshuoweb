import axios from 'axios';

export type Params = {
    pageSize?: number;
    pageIndex?: number;
};

export async function queryArticles(params?: Params) {
    return axios('/api/articles', {
        params,
    });
}

export async function queryArticleByID(id:string) {
    return axios('/api/articles/' + id);
}