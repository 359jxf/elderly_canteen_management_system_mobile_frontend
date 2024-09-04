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

//提交订单评价（堂食）
export const postDiningComment = async (
  orderId,
  falvorRate,
  flavorComment
) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/order/postDiningComment',
      {
        OrderId: orderId,
        CStars: falvorRate,
        CReviewText: flavorComment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('post堂食订单评价 success:', res.data.success,'菜品得分',falvorRate,'菜品评价',flavorComment)
    return res.status
  } catch (error) {
    return error.response
  }
}

//提交订单评价（外送）
export const postDeliverComment = async (
  orderId,
  deliverRate,
  deliverComment,
  falvorRate,
  flavorComment
) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/order/postDeliverComment',
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
    console.log('post外送订单评价 success:', res.data.success,'菜品得分',falvorRate,'菜品评价',flavorComment,
      '配送得分',deliverRate,'配送评价',deliverComment
    )
    return res.status
  } catch (error) {
    return error.response
  }
}

//查看订单评价（外送）
export const getDeliverComment = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/api/order/getDeliverComment', {
      params: { OrderId: orderId },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data.response)
    return res.data.response
  } catch (error) {
    console.error('Error fetching DeliverComment message:', error)
    throw error
  }
}

//查看订单评价（堂食）
export const getDiningComment = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/api/order/getDiningComment', {
      params: { OrderId: orderId },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data.response)
    return res.data.response
  } catch (error) {
    console.error('Error fetching DiningComment message:', error)
    throw error
  }
}

export const createCart = async () => {
  // res
  const res = await ins.post('/api/cart/createCart')
  // cartId
  const cartId = res.data.response.cartId
  // log
  console.log('api:CartId:', cartId)
  return cartId
}

export const getMenuToday = async () => {
  const res = await ins.get('/api/order/getMenuToday')
  // cartId
  const items = res.data.menu
  // log
  console.log('api:items:', items)
  return items
}

export const getCartItem = async () => {
  const res = await ins.get('/api/cart/getCartItem')
  // cartItems
  const cartItems = res.data.menu
  console.log('api:cartItems:', cartItems)
  return cartItems
}

export const updateCartItem = async (cartId, dishId, quantity) => {
  try {
    const res = await ins.post('/api/cart/updateCartItem', {
      CART_ID: cartId,
      DISH_ID: dishId,
      QUANTITY: quantity
    })
    console.log(res.data.success)
    return res.data.success
  } catch (error) {
    console.log(error)
  }
}

export const clearCart = async (cartId) => {
  try {
    const res = await ins.post('/api/cart/clearCart', {
      CART_ID: cartId
    })
    console.log(res.data.success)
    return res.data.success
  } catch (error) {
    console.log(error)
  }
}

