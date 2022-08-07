import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Space,
  Modal,
  message,
  Input,
} from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import CreateProvider from "./components/CreateProvider";
import EditProvider from "./components/EditProvider";
import { connect } from "react-redux";
import {
  getProviders,
  deleteProvider,
} from "../../appRedux/actions/Provider";


const { Search } = Input;

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
  const [selectedObj, setSelectedObj] = useState({});
  const columns = [
    {
      title: "ID",
      width: "5%",
      render: (text, record) => listData.indexOf(record) + 1,
    },
    {
      title: "Provider",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
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
        props.deleteProvider(record._id, (code) => {
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
    props.getProviders(
      { keyword: keyWord },
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
  }, [keyWord]);

  useEffect(() => {
    if (isFetch === true) {
      props.getProviders(
        { keyword: keyWord },
        (code, res) => handleResult(code, res)
      );
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
            Provider
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
          <Search
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
          />
        </Col>
      </Row>
      <div
        className="gx-card"
        key="card"
      >
        <Table
          className="gx-table-responsive"
          key="table"
          columns={columns}
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
            <CreateProvider
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
            <EditProvider
              id={selectedObj._id}
              name={selectedObj.name}
              address={selectedObj.address}
              email={selectedObj.email}
              mobile={selectedObj.mobile}
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
  getProviders,
  deleteProvider,
})(DomainConfig);
