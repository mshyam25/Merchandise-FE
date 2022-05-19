import { orderConstants } from '../constants/order.Constants'
import axios from 'axios'
import { API } from '../../utils'
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${API}/api/orders`, order, config)

    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/api/orders/${id}`, config)

    dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_PAY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `${API}/api/orders/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({ type: orderConstants.ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_LIST_MY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/api/orders/myorders`, config)

    dispatch({ type: orderConstants.ORDER_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/api/orders`, config)

    dispatch({ type: orderConstants.ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DELIVER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `${API}/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch({ type: orderConstants.ORDER_DELIVER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
