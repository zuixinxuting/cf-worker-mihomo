import * as utils from './utils.js';
export async function getv2ray_config(e) {
    const data = [];
    const hesList = [];
    for (const index of e.urls) {
        const apiurl = utils.buildApiUrl(index, e.sub, 'v2ray');
        const res = await utils.fetchResponse(apiurl, e.userAgent);
        if (res.data !== undefined && res.data !== null && res.data !== '') {
            data.push(res.data);
            hesList.push({
                status: res.status,
                headers: res.headers,
            });
        }
    }
    const randomIndex = Math.floor(Math.random() * hesList.length);
    const hes = hesList[randomIndex];
    if (data.length === 0) {
        return {
            status: 404,
            headers: hes.headers,
            data: '获取订阅数据失败，请检查订阅链接是否有效',
        };
    }
    let mergedData = '';
    for (const item of data) {
        try {
            const decoded = utils.base64DecodeUtf8(item);
            mergedData += decoded + '\n';
        } catch (error) {
            mergedData += item + '\n';
        }
    }
    const encodedData = utils.base64EncodeUtf8(mergedData);
    return {
        status: hes.status,
        headers: hes.headers,
        data: encodedData,
    };
}
