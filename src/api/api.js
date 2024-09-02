import ins from '../utils/axiosInstance.js'
export const getOrders = async () => {
  const res = await ins.get('/getPastOrder')
  console.log(res.data.response)
  return res.data.response
}

export const getAcceptableOrder = async () => {
  const res = await ins.get('/getAcceptableOrder')
  console.log(res.data.response)
  return res.data.response
}

export const getAcceptedOrder = async () => {
  const res = await ins.get('/getAcceptedOrder')
  console.log(res.data.response)
  return res.data.response
}

export const getFinishedOrder = async () => {
  const res = await ins.get('/getFinishedOrder')
  console.log(res.data.response)
  return res.data.response
}

export const postAccpetOrder = async (orderId) => {
  try {
    const response = await ins.post('/acceptOrder', { ORDER_ID: orderId })
    return response.status
  } catch (error) {
    return error.response
  }
}

export const getPorTrait = async () => {
  const res = await ins.get('/api/account/getPersonInfo')
  console.log('api:getPortrait url:', res.data.response.portrait)
  return res.data.response.portrait
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
