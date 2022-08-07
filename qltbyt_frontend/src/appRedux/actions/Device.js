import { FETCH_ERROR, FETCH_START } from "../../constants/ActionTypes";
import axios from "util/Api";

/**
 *  Hàm lay thông tin list Domain
 * @param {} page
 * @param {} page_size
 * @param {*} callback
 */
export const getDevices = (
  { keyword },
  callback = (code, response) => {}
) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(keyword);
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/devices/get',
      data: {
        keyword: keyword
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(200, res.data);
          }
        } else callback(404);
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

/**
 *  Hàm lay thông tin list Domain
 * @param {} page
 * @param {} page_size
 * @param {*} callback
 */
export const getDevicesByUserId = (
  { keyword, userId },
  callback = (code, response) => {}
) => {
  // console.log(page, page_size);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/devices/getByUserId',
      data: {
        keyword: keyword,
        userId: userId
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(200, res.data);
          }
        } else callback(404);
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

/**
 *  Hàm them domain
 * @param {} dataInfo
 */
export const createDevice = (dataInfo, callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(dataInfo);
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/devices',
      data: {
        name: dataInfo[0].value,
        model: dataInfo[1].value,
        serial: dataInfo[2].value,
        country: dataInfo[3].value,
        status: dataInfo[4].value.value,
        price: dataInfo[5].value,
        provider: dataInfo[6].value.name
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(200);
          }
        } else callback(404);
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

/**
 *  Hàm delete domain
 * @param {} domain_id
 */

export const deleteDevice = (deviceId, callback = (code, response) => {}) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(deviceId);
    dispatch({ type: FETCH_START });
    axios({
      method: 'delete',
      url: '/api/devices',
      data: {
        deviceId: deviceId
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (typeof callback === "function") {
            console.log(res.data);
            callback(200);
          }
        } else callback(404);
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

/**
 *  Hàm them domain
 * @param {} dataInfo
 */
export const editDevice = (dataInfo, id , callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(dataInfo[0], dataInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .put(
        `api/devices`,
        {
          deviceId: id,
          name: dataInfo[0].value,
          model: dataInfo[1].value,
          serial: dataInfo[2].value,
          country: dataInfo[3].value,
          status: dataInfo[3].value,
          price: dataInfo[4].value,
          provider: dataInfo[5].value
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (typeof callback === "function") {
            callback(200);
          }
        } else callback(404);
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