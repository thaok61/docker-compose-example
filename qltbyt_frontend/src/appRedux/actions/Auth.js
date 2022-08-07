import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";
import axios from "util/Api";
import qs from "qs";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userSignUp = (
  { email, password, name },
  callback = (response) => {}
) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post(
        "api/users",
        {
          name: name,
          email: email,
          password: password,
          role: "user"
        }
      )
      .then((res) => {
        console.log("data:", res);
        if (res.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
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

export const userSignIn = (
  { email, password },
  callback = (response) => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post(
        "api/auth",
        {
          email: email,
          password: password,
        }
      )
      .then((res) => {
        console.log("userSignIn: ", res);
        if (res.status === 200) {
          if (cookies.get("token") != null || cookies.get("role") != null) {
            cookies.remove("token");
            cookies.remove("role");
          }
          // const current = new Date();
          // const nextYear = new Date();
          // nextYear.setFullYear(current.getFullYear() + 1);
          // nextYear.setTime(current.getTime() + (60 * 60 * 1000))
          
          var decoded_token = jwt_decode(res.data.token);
          cookies.set("token", res.data.token);
          cookies.set("role", decoded_token.user.role);
          cookies.set("userId", decoded_token.user.id);

          axios.defaults.headers.common["x-auth-token"] = res.data.token;

          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: res.data.token });
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

export const getUserInfo = (callback = (code, data) => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .get("user/info")
      .then((res) => {
        console.log("user Info: ", res);
        if (res.data.code === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: res.data.data });
          if (typeof callback === "function") {
            callback(res.data.code, res.data.data);
          }
        } else {
          callback(res.data.code, null);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404, null);
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    // dispatch({ type: FETCH_START });
    dispatch({ type: SIGNOUT_USER_SUCCESS });
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("email");

    // axios.post('auth/logout').then(({data}) => {
    //   console.log("log out",data)
    //   if (data.result) {
    //     localStorage.removeItem("token");
    //     dispatch({type: FETCH_SUCCESS});
    //     dispatch({type: SIGNOUT_USER_SUCCESS});
    //   } else {
    //     dispatch({type: FETCH_ERROR, payload: data.error});
    //   }
    // }).catch(function (error) {
    //   dispatch({type: FETCH_ERROR, payload: error.message});
    //   console.log("Error****:", error.message);
    // });
  };
};

/**
 * Hamf update user info (user)
 * @param {array} userInfo
 * @param {*} callback
 */
export const updateUserInfo = (userInfo, callback = (response) => {}) => {
  return (dispatch) => {
    axios
      .put(
        "user/info",
        qs.stringify({
          username: userInfo[0].value,
          firstname: userInfo[2].value,
          lastname: userInfo[3].value,
          phone: userInfo[4].value,
          sex: userInfo[5].value,
          dateofbirth: userInfo[6].value.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        })
      )
      .then((res) => {
        console.log("update user info: ", res);
        if (res.data.code === 200) {
          if (typeof callback === "function") {
            callback(res.data.code);
          }
        } else {
          callback(res.data.code);
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
 * Ham thay doi mat khau (user)
 * @param {array} password
 * @param {*} callback
 */
export const changePassword = (password, callback = (response) => {}) => {
  return (dispatch) => {
    axios
      .post(
        "user/pwd",
        qs.stringify({
          old_passwd: password[0].value,
          new_passwd: password[1].value,
        })
      )
      .then((res) => {
        console.log("change pass: ", res);
        if (res.data.code === 200) {
          if (typeof callback === "function") {
            callback(res.data.code);
          }
        } else {
          callback(res.data.code);
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
 * Ham reset password
 * Nhập email để lấy lại mật khẩu
 * @param {*} email
 * @param {*} callback
 */
export const verifyEmail = ({ email }, callback = (code) => {}) => {
  return (dispatch) => {
    axios
      .get(`user/verification?email=${email}`)
      .then((res) => {
        console.log("token verify (reset password): ", res);
        if (res.data.code === 200) {
          cookies.set("email_token", res.data.data.token);
          cookies.set("email_verify", res.data.data.email);
          if (typeof callback === "function") {
            callback(res.data.code);
          }
        } else {
          callback(res.data.code);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404);
      });
  };
};

export const resetPassword = (
  { verifyCode, new_passwd },
  callback = (res) => {}
) => {
  return (dispatch) => {
    axios
      .post(
        "user/verification",
        qs.stringify({
          email:
            cookies.get("email_verify") != null
              ? cookies.get("email_verify")
              : null,
          token:
            cookies.get("email_token") != null
              ? cookies.get("email_token")
              : null,
          code: verifyCode,
          new_passwd: new_passwd,
        })
      )
      .then((res) => {
        console.log("reset password: ", res);
        if (res.data.code === 200) {
          if (typeof callback === "function") {
            callback(res.data.code);
            cookies.remove("email_verify");
            cookies.remove("email_token");
          }
        } else {
          callback(res.data.code);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error });
        console.log("Error****:", error);
        callback(404);
      });
  };
};
