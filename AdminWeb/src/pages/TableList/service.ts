import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function queryArticles(params?: TableListParams) {
  return request('/admin/articles', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}