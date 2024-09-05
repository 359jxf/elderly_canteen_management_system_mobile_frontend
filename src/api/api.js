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
export const postDiningComment = async (orderId, falvorRate, flavorComment) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/api/order/postDiningComment',
      {
        OrderId: orderId,
        CStars: falvorRate,
        CReviewText: flavorComment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(
      'post堂食订单评价 success:',
      res.data.success,
      '菜品得分',
      falvorRate,
      '菜品评价',
      flavorComment
    )
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
    console.log(
      'post外送订单评价 success:',
      res.data.success,
      '菜品得分',
      falvorRate,
      '菜品评价',
      flavorComment,
      '配送得分',
      deliverRate,
      '配送评价',
      deliverComment
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
  try {
    const res = await ins.post('/api/cart/createCart')
    // cartId
    const cartId = res.data.response.cartId
    // log
    console.log('api:CartId:', cartId)
    return cartId
  } catch (error) {
    console.error(error.response)
  }
}

export const getMenuToday = async () => {
  const res = await ins.get('/api/order/getMenuToday')
  const items = res.data.menu
  console.log('1', res.data.message)
  console.log('api:items:', items)
  return items
}

export const getCartItem = async (cartId) => {
  try {
    const res = await ins.get(`/api/cart/getCartItem${cartId}`)
    const cartItems = res.data.menu
    console.log('api:cartItems:', cartItems)
    return cartItems // 返回成功状态和数据
  } catch (error) {
    console.error('Error fetching cart items:', error.response)
  }
}

export const updateCartItem = async (cartId, dishId, quantity) => {
  try {
    // 发送请求
    const res = await ins.post('/api/cart/updateCartItem', {
      cartId: cartId,
      dishId: dishId,
      quantity: quantity
    })

    // 打印响应内容以便调试
    console.log('Response:', res.data)

    // 确保字段名称正确
    const message = res.data.message

    // 根据返回的消息判断操作是否成功
    if (message === '超过库存，操作失败') {
      return { success: false }
    } else {
      return { success: true }
    }
  } catch (error) {
    // 处理请求或其他错误
    console.error('Error updating cart item:', error)
    return { success: false }
  }
}

export const clearCart = async (cartId) => {
  try {
    const res = await ins.post('/api/cart/clearCart', {
      cartId: cartId
    })
    console.log(res.data.success)
    return res.data.success
  } catch (error) {
    console.error(error.response.data)
    console.log(error)
  }
}

export const getBanlance = async () => {
  const res = await ins.get('/api/account/getPersonInfo')
  console.log(res.data.response.money)
  return res.data.response.money
}

export const deleteCartItem = async (cartId, dishId) => {
  const token = localStorage.getItem('token')
  const res = await ins.delete('/api/cart/deleteCartItem', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      cartId: cartId,
      dishId: dishId
    }
  })
  console.log(res.message)
}

export const ensureCart = async (
  carT_ID,
  deliver_or_dining,
  set_default_add,
  newAddress,
  remark
) => {
  try {
    console.log('Sending request with:', {
      carT_ID,
      deliver_or_dining,
      set_default_add,
      newAddress,
      remark
    })

    const res = await ins.post('/api/cart/ensureCart', {
      carT_ID,
      deliver_or_dining,
      set_default_add,
      newAddress,
      remark
    })

    console.log('Response:', res.message) // 修改为res.data查看实际返回内容
  } catch (error) {
    if (error.response) {
      // 请求已发出，服务器返回状态码不是2xx
      console.error('Error Response:', error.response.data)
      console.error('Error Status:', error.response.status)
      console.error('Error Headers:', error.response.headers)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Error Request:', error.request)
    } else {
      // 其他错误
      console.error('Error Message:', error.message)
    }
  }
}

export const getDefaultAddr = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/api/account/getPersonInfo', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response.address)
  return res.data.response.address
}
