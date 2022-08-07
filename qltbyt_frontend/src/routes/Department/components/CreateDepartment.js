import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { HomeOutlined, LinkOutlined } from "@ant-design/icons";
import { createDepartment } from "../../../appRedux/actions/Department";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

const mapStateToProps = () => ({});

const CreateDepartment = (props) => {
  const cookies = new Cookies();
  const [domainInfo, setDomainInfo] = useState([]);

  const onChange = (newFields) => {
    console.log(newFields);
    setDomainInfo(newFields);
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
    if (props.submitAdd === true) {
      props.createDepartment(domainInfo, (res) => handleAdd(res));
    }
  }, [props.submitAdd]);

  return (
    <Form
      name="basic"
      className="gx-signin-form gx-form-row0"
      fields={domainInfo}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields);
      }}
    >
      <p>Department</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Name" />
      </Form.Item>
      <p>Address</p>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your Address department",
          },
        ]}
      >
        <Input.TextArea
          prefix={<HomeOutlined />}
          placeholder="Address"
        />
      </Form.Item>
    </Form>
  );
}

export default connect(mapStateToProps, { createDepartment })(CreateDepartment);
