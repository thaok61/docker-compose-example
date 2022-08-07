import { FETCH_ERROR, FETCH_START } from "../../constants/ActionTypes";
import axios from "util/Api";

/**
 *  Hàm lay thông tin list Domain
 * @param {} page
 * @param {} page_size
 * @param {*} callback
 */
export const getProviders = (
  { keyword },
  callback = (code, response) => {}
) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(keyword);
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/providers/get',
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
 *  Hàm them domain
 * @param {} domainInfo
 */
export const createProvider = (dataInfo, callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(dataInfo);
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: 'api/providers',
      data: {
        name: dataInfo[0].value,
        address: dataInfo[1].value,
        mobile: dataInfo[3].value,
        email: dataInfo[2].value
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

export const deleteProvider = (providerId, callback = (code, response) => {}) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(providerId);
    dispatch({ type: FETCH_START });
    axios({
      method: 'delete',
      url: '/api/providers',
      data: {
        providerId: providerId
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
 * @param {} domainInfo
 */
export const editProvider = (dataInfo, id , callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(dataInfo[0], dataInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .put(
        `api/providers`,
        {
          providerId: id,
          name: dataInfo[0].value,
          address: dataInfo[1].value,
          mobile: dataInfo[3].value,
          email: dataInfo[2].value
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