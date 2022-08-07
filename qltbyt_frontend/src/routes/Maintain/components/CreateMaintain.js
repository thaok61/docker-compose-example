import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { createMaintain } from "../../../appRedux/actions/Maintain";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import Select from 'react-select'
import { 
  getDevicesByUserId,
} from "../../../appRedux/actions/Device"
const mapStateToProps = () => ({});
const cookies = new Cookies();
const userId = cookies.get("userId");
const CreateDepartment = (props) => {
  const optionsRole = [
    { value: 'OK', label: 'OK' },
    { value: 'Dang Bao tri', label: 'Dang Bao tri' },
    { value: 'Sap Bao tri', label: 'Sap Bao tri' },
    { value: 'Bi Hong', label: 'Bi Hong' },
  ]
  const [domainInfo, setDomainInfo] = useState([]);
  const [listDataDevices, setListDataDevices] = useState([]);

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
      props.getDevicesByUserId(
        { userId: userId },
        (code, res) => handleResult(code, res)
      );
    const handleResult = (code, res) => {
      if (code === 200) {
        console.log(res);
        setListDataDevices(res);
      } else {
        console.log(code);
        message.error("Error when getting domain information!");
      }
    };
  },[])

  useEffect(() => {
    if (props.submitAdd === true) {
      props.createMaintain(domainInfo, (res) => handleAdd(res));
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
      <p>Device</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Select
          className="gx-mr-3 gx-mb-3"
          getOptionLabel={e => e.name}
          getOptionValue={e => e._id}
          options={listDataDevices}/>
      </Form.Item>
      <p>Cost</p>
      <Form.Item
        name="cost"
        rules={[
          {
            required: true,
            message: "Please input your Address department",
          },
        ]}
      >
       <Input prefix={<LinkOutlined />} placeholder="Name" />
      </Form.Item>
      <p>Previous Status</p>
      <Form.Item
        name="previousStatus"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
      </Form.Item>
      <p>After Status</p>
      <Form.Item
        name="afterStatus"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
      </Form.Item>
      <p>Start Time</p>
      <Form.Item
        name="startTime"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Time" />
      </Form.Item>
      <p>End Time</p>
      <Form.Item
        name="endTime"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Time" />
      </Form.Item>
    </Form>
  );
}

export default connect(mapStateToProps, { 
  createMaintain,
  getDevicesByUserId
})(CreateDepartment);
