import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import Select from 'react-select'
import { LinkOutlined } from "@ant-design/icons";
import { createDevice } from "../../../appRedux/actions/Device";
import { getProviders } from "../../../appRedux/actions/Provider";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

const mapStateToProps = () => ({});

const CreateDevice = (props) => {
  const optionsRole = [
    { value: 'OK', label: 'OK' },
    { value: 'Dang Bao tri', label: 'Dang Bao tri' },
    { value: 'Sap Bao tri', label: 'Sap Bao tri' },
    { value: 'Bi Hong', label: 'Bi Hong' },
  ]
  const [listData, setListData] = useState([]);
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
      props.createDevice(domainInfo, (res) => handleAdd(res));
    }
  }, [props.submitAdd]);

  useEffect(() => {
    props.getProviders(
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

  return (
    <Form
      name="basic"
      className="gx-signin-form gx-form-row0"
      fields={domainInfo}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields);
      }}
    >
      <p>Device</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Name" />
      </Form.Item>
      <p>Model</p>
      <Form.Item
        name="model"
        rules={[
          {
            required: true,
            message: "Please input your Address department",
          },
        ]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Model" />
      </Form.Item>
      <p>Serial</p>
      <Form.Item
        name="serial"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Serial" />
      </Form.Item>
      <p>Country</p>
      <Form.Item
        name="country"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Serial" />
      </Form.Item>
      <p>Status</p>
      <Form.Item
        name="status"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
      </Form.Item>
      <p>Price</p>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Serial" />
      </Form.Item>
      <p>Provider</p>
      <Form.Item
        name="provider"
        >
        <Select
          className="gx-mr-3 gx-mb-3"
          getOptionLabel={e => e.name}
          getOptionValue={e => e.name}
          options={listData}/>
        </Form.Item>
    </Form>
  );
}

export default connect(mapStateToProps, { 
  createDevice,
  getProviders,
 })(CreateDevice);
