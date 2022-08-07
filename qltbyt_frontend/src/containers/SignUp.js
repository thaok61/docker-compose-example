import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const FormItem = Form.Item;

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  const [isAccept, setIsAccept] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log(values);
    dispatch(userSignUp(values, (res) => handleResult(res)));
  };

  const handleResult = (res) => {
    if (res === 200) {
      message.success("Sign Up Successfully! Please Login to the website !");
      history.push("/auth/signin");
    } else if (res === 1005) {
      message.error("Email is existed! Please try again");
    } else if (res === 500) {
      message.error("Server busy ! Please try again !");
    } else {
      message.error("Error when signing up ! Please try again !");
    }
  };

  // useEffect(() => {
  //   if (token !== null) {
  //     console.log("register successfully");

  //     history.push("/");
  //   }
  // });

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
                <IntlMessages id="app.userAuth.signUp" />
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
              <FormItem
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="name"
                  type="text"
                />
              </FormItem>

              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                  type="email"
                />
              </FormItem>
              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </FormItem>
              <FormItem
                name="confirm-password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Confirm Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </FormItem>
              <FormItem>
                <FormItem>
                  <Checkbox onClick={() => setIsAccept(!isAccept)}>
                    <IntlMessages id="appModule.iAccept" />
                  </Checkbox>
                  <span className="gx-signup-form-forgot gx-link">
                    <IntlMessages id="appModule.termAndCondition" />
                  </span>
                </FormItem>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  className="gx-mb-0"
                  htmlType="submit"
                  disabled={!isAccept}
                >
                  <IntlMessages id="app.userAuth.signUp" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{" "}
                <Link to="/auth/signin">
                  <IntlMessages id="app.userAuth.signIn" />
                </Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
