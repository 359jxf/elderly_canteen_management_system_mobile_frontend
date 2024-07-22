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

export const getAcceptedOrder=async()=>{
    const res=await ins.get('/getAcceptedOrder');
    console.log(res.data.response);
    return res.data.response;
}

export const getFinishedOrder=async()=>{
    const res=await ins.get('/getFinishedOrder');
    console.log(res.data.response);
    return res.data.response;
}