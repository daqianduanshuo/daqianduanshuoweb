import { request } from 'umi';

export type Params = {
  title?: string;
  pageSize?: number;
  pageIndex?: number;
};

export async function queryArticles(params?: Params) {
  return request('/admin/articles', {
    params,
  });
}

export async function addArticle(params:any) {
  return request('/admin/articles', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}