import { FETCH_ERROR } from "../../constants/ActionTypes";
import axios from "util/Api";
import qs from "qs";

/**
 *  Hàm update thông tin user account (admin  mới có quyền)
 * @param {} accountId
 * @param {} type
 * @param {} status
 * @param {*} callback
 */
export const updateUser = (userInfo, userId, callback = (response) => {}) => {
  return (dispatch) => {
    axios
      .put(
        "api/users",
        {
          userId: userId,
          name: userInfo[0].value,
          email: userInfo[1].value,
          role: userInfo[3].value.value,
          department: userInfo[2].value.name,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("update account: ", res);
          if (typeof callback === "function") {
            callback(res.status);
          }
        } else {
          callback(res.status);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404);
      });
  };
};

/**
 * Ham lay thong tin user by ID (admin)
 * @param {string} userID id cua user can lay thong tin (admin)
 * @param {*} callback
 */
export const getUserInfoByID = (userID, callback = (code, data) => {}) => {
  return (dispatch) => {
    axios
      .get(`admin/account/info?userid=${userID}`)
      .then((res) => {
        console.log("user Info (admin): ", res);
        if (res.data.code === 200) {
          if (typeof callback === "function") {
            callback(res.data.code, res.data.data);
          }
        } else {
          callback(res.data.code);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404, null);
      });
  };
};

/**
 * Ham lay danh sach user (by admin)
 * @param {} callback
 */
export const getListUsers = (
  { keyword },
  callback = (code, res) => {}
) => {
  return (dispatch) => {
    var url = `api/users/get`;
    axios
      .post(url,{
        keyword: keyword
      })
      .then((res) => {
        console.log("user list (admin): ", res);
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(res.status, res.data);
          }
        } else {
          callback(res.status);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404, null);
      });
  };
};

/**
 * Ham  tao user (by admin)
 * @param {} callback
 */

export const createUser = (
  userInfo,
  callback = (response) => {}
) => {
  return (dispatch) => {
    axios
      .post(
        "api/users",
        {
          name: userInfo[0].value,
          email: userInfo[1].value,
          password: userInfo[2].value,
          role: userInfo[5].value.value,
          department: userInfo[4].value.name,
        }
      )
      .then((res) => {
        console.log("data:", res);
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(res.status);
          }
        } else {
          console.log("payload: data.error");
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404);
      });
  };
};

/**
 * Ham xoa user (by admin)
 * @param {} callback
 */

export const deleteUser = (user_id, callback = (response) => {}) => {
  console.log(user_id);
  return (dispatch) => {
    axios({
        method: 'delete',
        url: '/api/users',
        data: {
          userId : user_id
        }
      })
      .then((res) => {
        if(res.status == 200) {
          if (typeof callback === "function") {
            callback(200);
          }
        } else {
          callback(res.status)
        }
        
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        if (typeof callback === "function") {
          callback(404);
        }
      });
  };
};
