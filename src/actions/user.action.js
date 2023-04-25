import axios from "axios";

export const GET_USER = "GET_USER";
export const ADD_USER_LIKE = "ADD_USER_LIKE";

export const getUser = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3000/user");
    dispatch({ type: GET_USER, payload: res.data[0] });
  };
};
export const addUserLike = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3000/user/${data.id}`, data)
      .then((res) => {
        dispatch({ type: ADD_USER_LIKE, payload: data });
      });
  };
};
