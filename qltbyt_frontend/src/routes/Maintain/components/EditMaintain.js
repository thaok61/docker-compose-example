import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { HomeOutlined, LinkOutlined } from "@ant-design/icons";
import { editMaintain } from "../../../appRedux/actions/Maintain";
import { 
  getDevicesByUserId,
} from "../../../appRedux/actions/Device"
import { connect } from "react-redux";
import Select from 'react-select'
import Cookies from "universal-cookie";

const mapStateToProps = () => ({});
const cookies = new Cookies();
const userId = cookies.get("userId");
const EditMaintain = (props) => {
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
    setDomainInfo([
      {
        name: ["device"],
        value: {
          name: props.device.name,
          _id: props.device._id
        }
      },
      {
        name: ["cost"],
        value: props.cost,
      },
      {
        name: ["previousStatus"],
        value: {
          label: props.previousStatus,
          value: props.previousStatus
        }
      },
      {
        name: ["afterStatus"],
        value: {
          label: props.afterStatus,
          value: props.afterStatus
        }
      },
      {
        name: ["startTime"],
        value: props.startTime,
      },
      {
        name: ["endTime"],
        value: props.endTime,
      },
    ]);
  }, [props.cost, props.previousStatus, props.endTime, props.startTime, props.afterStatus, props.selectedDevice]);
  
  

  useEffect(() => {
    if (props.submitUpdate === true) {
      props.editMaintain(domainInfo, props.id, (res) => handleAdd(res));
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
      <p>Device</p>
      <Form.Item
        name="device"
        rules={[{ required: true, message: "Please input your Maintain!" }]}
      >
        <Select
          className="gx-mr-3 gx-mb-3"
          getOptionLabel={e => e.name}
          getOptionValue={e => e.name}
          options={listDataDevices}/>
      </Form.Item>
      <p>Cost</p>
      <Form.Item
        name="cost"
        rules={[
          {
            required: true,
            message: "Please input your Address Maintain",
          },
        ]}
      >
       <Input prefix={<LinkOutlined />} placeholder="Name" />
      </Form.Item>
      <p>Previous Status</p>
      <Form.Item
        name="previousStatus"
        rules={[{ required: true, message: "Please input your Maintain!" }]}
      >
        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
      </Form.Item>
      <p>After Status</p>
      <Form.Item
        name="afterStatus"
        rules={[{ required: true, message: "Please input your Maintain!" }]}
      >
        <Select options={optionsRole} className="gx-mr-3 gx-mb-3"/>
      </Form.Item>
      <p>Start Time</p>
      <Form.Item
        name="startTime"
        rules={[{ required: true, message: "Please input your Maintain!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Time" />
      </Form.Item>
      <p>End Time</p>
      <Form.Item
        name="endTime"
        rules={[{ required: true, message: "Please input your Maintain!" }]}
      >
        <Input prefix={<LinkOutlined />} placeholder="Time" />
      </Form.Item>
    </Form>
  );
}

export default connect(mapStateToProps, { 
  editMaintain,
  getDevicesByUserId 
})(EditMaintain);
