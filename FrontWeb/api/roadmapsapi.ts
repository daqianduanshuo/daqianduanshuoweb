import axios from 'axios';

export type Params = {
    type?: string;
};

export async function queryRoadMaps(params?: Params) {
    return axios('/api/roadmaps', {
        params,
    });
}
