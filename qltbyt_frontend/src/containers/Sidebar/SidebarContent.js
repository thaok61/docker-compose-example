import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const roleAccount = cookies.get("role");

const SidebarContent = () => {
  let { navStyle, themeType } = useSelector(({ settings }) => settings);
  let { pathname } = useSelector(({ common }) => common);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  const renderContent = () =>{
    if (roleAccount == "admin") {
      return ( 
        <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
      <Menu.Item key="department-config">
        <Link to="/department-config">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.department"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="user-manager">
        <Link to="/user-manager">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.user"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="provider-config">
        <Link to="/provider">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.provider"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="device-config">
        <Link to="/device">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.device"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="maintain-config">
        <Link to="/maintain">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.maintain"/>
          </span>
          </Link>
      </Menu.Item>
      </Menu>
      );
    } else {
      return (
        <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
     <Menu.Item key="provider-config">
        <Link to="/provider">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.provider"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="device-config">
        <Link to="/device">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.device"/>
          </span>
          </Link>
      </Menu.Item>
      <Menu.Item key="maintain-config">
        <Link to="/maintain">
          <i className="icon icon-social" />
          <span>
            <IntlMessages id="sidebar.maintain"/>
          </span>
          </Link>
      </Menu.Item>
      </Menu>
      );
    }
  } 
  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
            {renderContent()}
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};

export default SidebarContent;
