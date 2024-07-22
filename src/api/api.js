import ins from  '../utils/axiosInstance.js'
export const getOrders=async()=>{
    const res=await ins.get('/getPastOrder');
    console.log(res.data.response);
    return res.data.response;
}

export const getAcceptableOrder=async()=>{
    const res=await ins.get('/getAcceptableOrder');
    console.log(res.data.response);
    return res.data.response;
}
