import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";

const UserInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li onClick={() => history.push("/user-profile")}>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar
        src={require("../../assets/images/placeholder.jpg")}
        className="gx-avatar gx-pointer"
        alt=""
      />
    </Popover>
  );
};

export default UserInfo;
