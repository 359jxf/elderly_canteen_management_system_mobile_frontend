import ins from '../utils/axiosInstance.js'

//获取历史订单
export const getOrders = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/order/getPastOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

// 查询可接订单
export const getAcceptableOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/volServe/getAcceptableOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

//查询志愿者当前订单
export const getAcceptedOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/volServe/getAcceptedOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

//查询志愿者已送订单
export const getFinishedOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/volServe/getFinishedOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

//接收配送订单
export const postAccpetOrder = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const response = await ins.post(
      '/api/volServe/postAcceptOrder',
      { ORDER_ID: orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.status
  } catch (error) {
    return error.response
  }
}

//获取用户头像
export const getPorTrait = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/account/getPersonInfo', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log('api:getPortrait url:', res.data.response.portrait)
  return res.data.response.portrait
}

//查询订单信息
export const getOrderMsg = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/api/order/getOrderMsg', {
      params: { OrderId: orderId },

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data.response)
    return res.data.response
  } catch (error) {
    console.error('Error fetching order message:', error)
    throw error
  }
}

//查询订单配送信息
export const getOrderDeliverMsg = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/api/order/getOrderDeliverMsg', {
      params: { OrderId: orderId },

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data.response)
    return res.data.response
  } catch (error) {
    console.error('Error fetching delivery message:', error)
    throw error
  }
}

//确认取餐
export const postConfirmOrder = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/order/postConfirmOrder',
      { OrderId: orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('postConfirmOrder success:', res.data.success)
    return res.status
  } catch (error) {
    return error.response
  }
}

//确认送达
export const postConfirmDelivered = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/volServe/postConfirmDelivered',
      { OrderId: orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('postConfirmDelivered success:', res.data.success)
    return res.status
  } catch (error) {
    return error.response
  }
}

//提交订单评价
export const postComment = async (
  orderId,
  deliverRate,
  deliverComment,
  falvorRate,
  flavorComment
) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/order/postComment',
      {
        OrderId: orderId,
        CStars: falvorRate,
        CReviewText: flavorComment,
        DStars: deliverRate,
        DReviewText: deliverComment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('postComment success:', res.data.success)
    return res.status
  } catch (error) {
    return error.response
  }
}

//查看订单评价
export const getComment = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/api/order/getComment', {
      params: { OrderId: orderId },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data.response)
    return res.data.response
  } catch (error) {
    console.error('Error fetching comment message:', error)
    throw error
  }
}
