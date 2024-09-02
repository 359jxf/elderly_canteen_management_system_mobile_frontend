import ins from '../utils/axiosInstance.js'

export const getOrders = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/getPastOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

export const getAcceptableOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/getAcceptableOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

export const getAcceptedOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/getAcceptedOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

export const getFinishedOrder = async () => {
  const token = localStorage.getItem('token')
  const res = await ins.get('/getFinishedOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log(res.data.response)
  return res.data.response
}

export const postAccpetOrder = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const response = await ins.post(
      '/acceptOrder',
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

export const getOrderMsg = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/getOrderMsg', {
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

export const getOrderDeliverMsg = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/getOrderDeliverMsg', {
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

export const postConfirmOrder = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/postConfirmOrder',
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

export const postConfirmDelivered = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.post(
      '/postConfirmDelivered',
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
      '/postConfirmDelivered',
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

export const getComment = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await ins.get('/getComment', {
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
