import {
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const INIT_STATE = {
  token: cookies.get("token") != null ? cookies.get("token") : null,
  initURL: "",
  authUser: cookies.get("user") != null ? cookies.get("user") : null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: "",
      };
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    default:
      return state;
  }
};
