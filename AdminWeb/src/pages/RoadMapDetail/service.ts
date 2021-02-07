import { request } from 'umi';

export type Params = {  
    id: number;
};
export async function queryRoadMapByID(params: Params) {
    return request('/admin/roadmaps/' + params["id"]);
}

export async function createRoadMap(params:any) {
    return request('/admin/roadmaps', {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateRoadMap(id:string,params:any) {
    return request('/admin/roadmaps/' + id, {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}