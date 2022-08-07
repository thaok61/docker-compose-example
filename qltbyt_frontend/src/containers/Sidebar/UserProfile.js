import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "../../appRedux/actions/Auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const roleAccount = cookies.get("role");

const UserProfile = () => {
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <div
      className="gx-flex-row gx-align-items-center gx-mb-2 gx-ml-3 gx-avatar-row"
      style={{ justifyContent: "center" }}
    >
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
        style={{ alignItems: "center" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={require("../../assets/images/placeholder.jpg")}
            className="gx-size-50 gx-pointer gx-mr-3"
            alt=""
          />
        </div>

        <br />
        <div>
          <span className="gx-avatar-name">
            {roleAccount}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default UserProfile;
