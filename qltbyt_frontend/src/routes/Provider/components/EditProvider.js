import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { HomeOutlined, LinkOutlined } from "@ant-design/icons";
import { editProvider } from "../../../appRedux/actions/Provider";
import { connect } from "react-redux";

const mapStateToProps = () => ({});

const EditProvider = (props) => {
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
    setDomainInfo([
      {
        name: ["name"],
        value: props.name,
      },
      {
        name: ["address"],
        value: props.address,
      },
      {
        name: ["email"],
        value: props.email,
      },
      {
        name: ["mobile"],
        value: props.mobile
      }
    ]);
  }, [props.name, props.address]);
  
  useEffect(() => {
    if (props.submitUpdate === true) {
      props.editProvider(domainInfo, props.id, (res) => handleAdd(res));
    }
  }, [props.submitUpdate]);

  return (
    <Form
      name="basic"
      className="gx-signin-form gx-form-row0"
      fields={domainInfo}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields);
      }}
    >
      <p>Provider</p>
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
            message: "Please input your Address correctly",
          },
        ]}
      >
        <Input.TextArea
          prefix={<HomeOutlined />}
          placeholder="Address"
        />
      </Form.Item>
      <p>Email</p>
      <Form.Item
        name="email"
        rules={[
          { 
            required: true, 
            message: "Please input your email correctly!",
            type: "email" 
          }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="EMAIL" />
      </Form.Item>
      <p>Mobile</p>
      <Form.Item
        name="mobile"
        rules={[{ required: true, message: "Please input your mobile!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Mobile" />
      </Form.Item>
    </Form>
  );
}

export default connect(mapStateToProps, { editProvider })(EditProvider);
