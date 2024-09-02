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

export const postAccpetOrder=async(orderId)=>{
    try {
        const response = await ins.post('/acceptOrder', { ORDER_ID: orderId });
        return response.status;
      } catch (error) {
        return error.response;
      }

}

export const getPorTrait=async()=>{
    const res=await ins.get('/api/account/getPersonInfo');
    console.log("api:getPortrait url:",res.data.response.portrait);
    return res.data.response.portrait;

}

export const getOrderMsg = async (orderId) => {
    try {
        const res = await ins.get('/getOrderMsg', {
            params: { OrderId: orderId }
        });
        console.log(res.data.response);
        return res.data.response;
    } catch (error) {
        console.error('Error fetching order message:', error);
        throw error;
    }
};

export const getOrderDeliverMsg = async (orderId) => {
    try {
        const res = await ins.get('/getOrderDeliverMsg', {
            params: { OrderId: orderId }
        });
        console.log(res.data.response);
        return res.data.response;
    } catch (error) {
        console.error('Error fetching delivery message:', error);
        throw error;
    }
};

export const postConfirmOrder=async(orderId)=>{
    try {
        const res = await ins.post('/postConfirmOrder', { OrderId: orderId });
        console.log('postConfirmOrder success:',res.data.success)
        return res.status;
      } catch (error) {
        return error.response;
      }

}

export const postConfirmDelivered =async(orderId)=>{
    try {
        const res = await ins.post('/postConfirmDelivered', { OrderId: orderId });
        console.log('postConfirmDelivered success:',res.data.success)
        return res.status;
      } catch (error) {
        return error.response;
      }

}

