import { FETCH_ERROR, FETCH_START } from "../../constants/ActionTypes";
import axios from "util/Api";
import { DeliveredProcedureOutlined } from "@ant-design/icons";

/**
 *  Hàm lay thông tin list Domain
 * @param {} page
 * @param {} page_size
 * @param {*} callback
 */
export const getMaintains = (
  { device },
  callback = (code, response) => {}
) => {
  // console.log(page, page_size);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios({
      method: 'post',
      url: '/api/maintains/get',
      data: {
        device: device
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
export const createMaintain = (domainInfo, callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(domainInfo[0], domainInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .post(
        `api/maintains`,
        {
            device: domainInfo[0].value._id,
            cost: domainInfo[1].value,
            previousStatus: domainInfo[2].value.value,
            afterStatus: domainInfo[3].value.value,
            startTime: domainInfo[4].value,
            endTime: domainInfo[5].value
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

export const deleteMaintain = (maintainId, callback = (code, response) => {}) => {
  // console.log(page, page_size);
  return (dispatch) => {
    console.log(maintainId);
    dispatch({ type: FETCH_START });
    axios({
      method: 'delete',
      url: '/api/maintains',
      data: {
        maintainId: maintainId
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
export const editMaintain = (domainInfo, id , callback = (code, response) => {}) => {
  return (dispatch) => {
    console.log(domainInfo[0], domainInfo[1]);
    dispatch({ type: FETCH_START });
    axios
      .put(
        `api/maintains`,
        {
            maintainId: id,
            device: domainInfo[0].value._id,
            cost: domainInfo[1].value,
            previousStatus: domainInfo[2].value.value,
            afterStatus: domainInfo[3].value.value,
            startTime: domainInfo[4].value,
            endTime: domainInfo[5].value
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