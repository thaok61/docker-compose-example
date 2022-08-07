import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userSignIn } from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const roleAccount = cookies.get("role");

const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log("finish", values);
    dispatch(userSignIn(values, (res) => handleResult(res)));
  };

  const handleResult = (res) => {
    if (res === 200) {
      message.success("Login successfully !");
      console.log("login success");
      if (cookies.get("role") == "admin") {
        props.history.push("/department-config");
        window.location.reload(true);
      } else {
        props.history.push("/provider");
        window.location.reload(true);
      }
    } else if (res === 1000) {
      message.error("Your account isn't actived ! Please active your account");
    } else if (res === 1007) {
      message.error("Incorrect email or password!");
    } else if (res === 500) {
      message.error("Server busy ! Please try again !");
    } else {
      message.error("Login failed ! Please try again !");
      console.log("login fail");
    }
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src={require("assets/images/bg-login.jpg")} alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "The input is not valid E-mail!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  type="password"
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <Link
                  className="gx-login-form-forgot"
                  to="/auth/forgot-password"
                >
                  Forgot password
                </Link>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{" "}
                <Link to="/auth/signup">
                  <IntlMessages id="app.userAuth.signUp" />
                </Link>
              </Form.Item>
              <span className="gx-text-light gx-fs-sm"> </span>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
