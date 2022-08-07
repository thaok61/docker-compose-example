import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Space,
  Modal,
  message,
} from "antd";
import Select from 'react-select'
import { GlobalOutlined } from "@ant-design/icons";

import CreateMaintain from "./components/CreateMaintain";
import EditMaintain from "./components/EditMaintain";
import { connect } from "react-redux";
import { 
  getDevicesByUserId,
  getDevices
} from "../../appRedux/actions/Device"
import {
  getMaintains,
  deleteMaintain,
} from "../../appRedux/actions/Maintain";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const roleAccount = cookies.get("role");
const userId = cookies.get("userId");

const mapStateToProps = () => ({});
const confirm = Modal.confirm;
const DomainConfig = (props) => {
  //#region state
  const [isFetch, setIsFetch] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [listData, setListData] = useState([]);
  const [listDataDevices, setListDataDevices] = useState([]);
  const [selectedDevice,setSelectedDevice] = useState({});
  const [selectedObj, setSelectedObj] = useState({});
  const adminColumns = [
    {
      title: "ID",
      width: "5%",
      render: (text, record) => listData.indexOf(record) + 1,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Previous Status",
      dataIndex: "previousStatus",
      key: "previousStatus",
    },
    {
      title: "After Status",
      dataIndex: "afterStatus",
      key: "afterStatus",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
  ]
  const columns = [
    {
      title: "ID",
      width: "5%",
      render: (text, record) => listData.indexOf(record) + 1,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Previous Status",
      dataIndex: "previousStatus",
      key: "previousStatus",
    },
    {
      title: "After Status",
      dataIndex: "afterStatus",
      key: "afterStatus",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space
          size="large"
          onClick={() =>
            setSelectedObj(record)
          }
        >
            <Space size="large" style={{ alignItems: "center" }}>
              <span className="gx-link" onClick={() => confirmDelete(record)}>
                <Button
                  style={{
                    width: "80px",
                    height: "35px",
                    margin: "auto",
                  }}
                  type = "danger"
                >
                  Delete
                </Button>
              </span>
            </Space>
            <Space size="large" style={{ alignItems: "center" }}>
              <span className="gx-link" onClick={() => setIsEdit(true)}>
                <Button
                  style={{
                    width: "80px",
                    height: "35px",
                    margin: "auto",
                  }}
                  type = "primary"
                >
                  Edit
                </Button>
              </span>
            </Space>
        </Space>
      ),
    },
  ];

  // handle selection
  const handleChange = (value) => {
    console.log(value);
    setSelectedDevice(value);
  };

  const onIsFetch = (isFetch) => {
    setIsFetch(isFetch);
  };

  const onClose = () => {
    setSubmitAdd(false);
    setSubmitUpdate(false);
    setIsAdd(false);
    setIsEdit(false);
    setIsFetch(false);
  };

  const confirmDelete = (record) => {
    confirm({
      title: "Do you want to delete this domain ?",
      content: "If you agree, please click OK ",
      onOk() {
        props.deleteMaintain(record._id, (code) => {
          if (code === 200) {
            setIsFetch(true);
            onClose();
            message.success("Delete App Successfully !");
          } else message.error("Error when deleting app !");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (roleAccount == "admin") {
      props.getDevices(
        { userId: userId },
        (code, res) => handleResult(code, res)
      );
    } else {
      props.getDevicesByUserId(
        { userId: userId },
        (code, res) => handleResult(code, res)
      );
    }
    const handleResult = (code, res) => {
      if (code === 200) {
        setListDataDevices(res);
      } else {
        console.log(code);
        message.error("Error when getting domain information!");
      }
    };
  },[])
  useEffect(() => {
    if (JSON.stringify(selectedDevice) !== "{}") {
      props.getMaintains(
        { 
          device: selectedDevice._id,
        },
        (code, res) => handleResult(code, res)
      );
    }
      console.log(selectedDevice);
      const handleResult = (code, res) => {
      if (code === 200) {
        setListData(res);
      } else {
        console.log(code);
        message.error("Error when getting domain information!");
      }
    };
  }, [selectedDevice]);

  useEffect(() => {
    if (isFetch === true) {
      if (JSON.stringify(selectedDevice) !== "{}") {
        props.getMaintains(
          { 
            device: selectedDevice._id,
          },
          (code, res) => handleResult(code, res)
        );
      }
      const handleResult = (code, res) => {
        if (code === 200) {
          // console.log(res);
          setListData(res);
        } else {
          console.log(code);
          message.error("Error when getting domain information!");
        }
      };
    }
  }, [isFetch, keyWord]);

  return (
    <div>
      <Row
        // justify="space-between"
        style={{ marginLeft: "-15px", marginRight: "-15px" }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h4
            className="gx-font-weight-semi-bold gx-mb-3"
            style={{ color: "#274679" }}
          >
            Maintain
          </h4>
        </Col>
        <Col
          xs={11}
          sm={11}
          md={4}
          lg={4}
          xl={4}
          xxl={3}
          className="gx-order-lg-1 gx-order-md-1"
          style={{ marginRight: "0px" }}
        >
          {roleAccount == "user" ? (
            <Button
            type="default"
            style={{
              // backgroundColor: "#274679",
              fontWeight: 600,
              height: "37px",
              color: "#274679",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.03)",
            }}
            icon={<GlobalOutlined />}
            onClick={() => setIsAdd(true)}
          >
            Add
          </Button>
          ) :  (
            ""
          )}
        </Col>
        <Col
          xs={13}
          sm={13}
          md={7}
          lg={7}
          xl={6}
          xxl={6}
          className="gx-order-lg-3  gx-order-md-3"
        >
          <Select
          className="gx-mr-3 gx-mb-3"
          getOptionLabel={e => e.name}
          getOptionValue={e => e._id}
          options={listDataDevices}
          onChange={handleChange}/>
          
        </Col>
        
        <Col
          xs={0}
          sm={0}
          md={1}
          lg={4}
          xl={6}
          xxl={7}
          className="gx-order-lg-2 gx-order-md-2"
        ></Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
          xxl={8}
          className="gx-order-lg-4 gx-order-md-4"
        >
          {/* <Search
            placeholder="Filter by domain ..."
            onSearch={(value) => setKeyWord(value)}
            allowClear
            bordered={false}
            enterButton={<GlobalOutlined />}
            style={{
              height: "37px",
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.03)",
            }}
          /> */}
        </Col>
      </Row>
      <div
        className="gx-card"
        key="card"
      >
        <Table
          className="gx-table-responsive"
          key="table"
          columns={roleAccount === "user" ? columns : adminColumns}
          dataSource={listData}
          pagination={false}
          rowKey="id"
          style={{
            border: "none",
            borderRadius: "10px",
            minHeight: "360px",
          }}
        />
        <br />

        {isAdd && (
          <Modal
            maskClosable={false}
            title="Add new domain"
            width={720}
            wrapClassName="vertical-center-modal"
            visible={isAdd}
            onOk={() => setSubmitAdd(true)}
            onCancel={() => setIsAdd(false)}
          >
            <CreateMaintain
              submitAdd={submitAdd}
              onClose={onClose}
              onIsFetch={onIsFetch}
            />
          </Modal>
        )}

        {isEdit && (
          <Modal
            title="Edit User Information"
            width={720}
            wrapClassName="vertical-center-modal"
            visible={isEdit}
            onOk={() => setSubmitUpdate(true)}
            onCancel={() => setIsEdit(false)}
          >
            <EditMaintain
              device={selectedDevice}
              id={selectedObj._id}
              cost={selectedObj.cost}
              previousStatus={selectedObj.previousStatus}
              afterStatus={selectedObj.afterStatus}
              startTime={selectedObj.startTime}
              endTime={selectedObj.endTime}
              submitUpdate={submitUpdate}
              onClose={onClose}
              onIsFetch={onIsFetch}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, {
  getMaintains,
  deleteMaintain,
  getDevicesByUserId,
  getDevices
})(DomainConfig);
