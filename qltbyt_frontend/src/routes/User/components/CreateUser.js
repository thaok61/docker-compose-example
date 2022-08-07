import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, message } from "antd";
import Select from 'react-select'
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../appRedux/actions/Department";
import { createUser } from "../../../appRedux/actions/User"
import { connect } from "react-redux";

const mapStateToProps = () => ({});

const CreateUser = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [listData, setListData] = useState([]);
  const optionsRole = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' },
  ]
  const onChange = (newFields) => {
    console.log(newFields);
    setUserInfo(newFields);
  };

  const handleAdd = (res) => {
    console.log(res);
    if (res === 200) {
      message.success("Add domain information successfully!");
      props.onIsFetch(true);
    } else message.error("Error when adding domain information !");
    props.onClose();
  };

  useEffect(() => {
    props.getDepartments(
      { keyword: "" },
      (code, res) => handleResult(code, res)
    );
    const handleResult = (code, res) => {
      if (code === 200) {
        // console.log(res);
        console.log(res);
        setListData(res);
      } else {
        console.log(code);
        message.error("Error when getting domain information!");
      }
    };
  }, []);
  useEffect(() => {
    if (props.submitAdd === true) {
      props.createUser(userInfo, (res) => handleAdd(res));
    }
  }, [props.submitAdd]);

  return (
    <Form
            name="basic"
            fields={userInfo}
            className="gx-signin-form gx-form-row0"
            onFieldsChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
        >

            <Row gutter={[16, 10]}>
                <Col span={12}>
                    <p>Name</p>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "Please input your username!" },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Name"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <p>Email</p>
                    <Form.Item
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
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 10]}>
                <Col span={12}>
                    <p>Password</p>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Please input your Password!" },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                </Col>
                <Col span={12}>
                    <p>Confirm Password</p>
                    <Form.Item
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
                        <Input
                            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 10]}>
                <Col span={12}>
                    <p>Department</p>
                    <Form.Item
                        name="department"
                    >
                        <Select
                        className="gx-mr-3 gx-mb-3"
                        getOptionLabel={e => e.name}
                        getOptionValue={e => e.name}
                        options={listData}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <p>Role</p>
                    <Form.Item
                        name="role"
                    >
                        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form >
  );
}

export default connect(mapStateToProps, { 
  createUser,
  getDepartments
 })(CreateUser);
