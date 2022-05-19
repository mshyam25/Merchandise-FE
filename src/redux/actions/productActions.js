import { productConstants } from '../constants/productConstants'
import axios from 'axios'
import { API } from '../../utils'
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(`${API}/api/products`)

    dispatch({ type: productConstants.PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`${API}/api/products/${id}`)

    dispatch({ type: productConstants.PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productConstants.PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`${API}/api/products/${id}`, config)

    dispatch({ type: productConstants.PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productConstants.PRODUCT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${API}/api/products`, {}, config)

    dispatch({ type: productConstants.PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: productConstants.PRODUCT_UPDATE_REQUEST })

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
      `${API}/api/products/${product._id}`,
      product,
      config
    )

    dispatch({ type: productConstants.PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
