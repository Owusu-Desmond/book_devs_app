import axios from 'axios';
import * as types from './devTypes';

const userAuth = localStorage.getItem('userAuth');

const getDevelopers = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DEVELOPERS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: userAuth,
      },
    };
    const { data } = await axios.get(
      'http://127.0.0.1:3000/api/v1/developers',
      config,
    );
    dispatch({
      type: types.GET_DEVELOPERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DEVELOPERS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

const addDev = (FormData) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/api/v1/developers',
      data: FormData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userAuth,
      },
    });
    dispatch({
      type: types.ADD_DEVELOPER,
      payload: data,
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
  }
};

export { getDevelopers, addDev };
