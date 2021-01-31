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
