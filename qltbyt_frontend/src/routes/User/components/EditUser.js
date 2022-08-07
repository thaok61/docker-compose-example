import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, message } from "antd";
import Select from 'react-select'
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../appRedux/actions/Department";
import { updateUser } from "../../../appRedux/actions/User"
import { connect } from "react-redux";

const mapStateToProps = () => ({});

const EditUser = (props) => {
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
    setUserInfo([
      {
        name: ["name"],
        value: props.name,
      },
      {
        name: ["email"],
        value: props.email,
      },
      {
        name: ["role"],
        value: {
          value: props.role,
          label: props.role
        }
      },
      {
        name: ["department"],
        value: {
          name: props.department,
        }
      }
    ]);
  }, [props.name, props.address]);

  useEffect(() => {
    props.getDepartments(
      { keyword: "" },
      (code, res) => handleResult(code, res)
    );
    const handleResult = (code, res) => {
      if (code === 200) {
        setListData(res);
      } else {
        console.log(code);
        message.error("Error when getting domain information!");
      }
    };
  }, []);
  useEffect(() => {
    if (props.submitUpdate === true) {
      props.updateUser(userInfo, props.id , (res) => handleAdd(res));
    }
  }, [props.submitUpdate]);

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
  updateUser,
  getDepartments
 })(EditUser);
