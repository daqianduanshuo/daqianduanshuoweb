import { request } from 'umi';

export type Params = {
  title?: string;
  type?:  string;
};

export async function queryroadmaps(params?: Params) {
  return request('/admin/roadmaps', {
    params,
  });
}
