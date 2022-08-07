import { FETCH_ERROR, FETCH_START } from "../../constants/ActionTypes";
import axios from "util/Api";

/**
 *  Hàm lay thông tin list Domain
 * @param {} page
 * @param {} page_size
 * @param {*} callback
 */
export const getDepartments = (
  { keyword },
  callback = (code, response) => {}
) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(keyword);
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/departments/get',
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
export const createDepartment = (domainInfo, callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(domainInfo[0], domainInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .post(
        `api/departments`,
        {
          name: domainInfo[0].value,
          address: domainInfo[1].value,
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

/**
 *  Hàm delete domain
 * @param {} domain_id
 */

export const deleteDepartment = (departmentId, callback = (code, response) => {}) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(departmentId);
    dispatch({ type: FETCH_START });
    axios({
      method: 'delete',
      url: '/api/departments',
      data: {
        departmentId: departmentId
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
export const editDepartment = (domainInfo, id , callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(domainInfo[0], domainInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .put(
        `api/departments`,
        {
          departmentId: id,
          name: domainInfo[0].value,
          address: domainInfo[1].value,
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