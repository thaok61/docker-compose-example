import React from "react";
import Widget from "components/Widget";
import { Avatar, Row } from "antd";

const contactList = [
  {
    id: 1,
    title: 'User Name',
    icon: 'user-o',
    desc: [<span className="gx-link" key={1}>Jack Wiliams</span>]
  },
  {
    id: 2,
    title: 'Full Name',
    icon: 'keyboard',
    desc: [<span className="gx-link" key={2}>Jack Wiliams</span>]
  },
  {
    id: 3,
    title: 'Email',
    icon: 'email',
    desc: [<span className="gx-link" key={3}>kiley.brown@example.com</span>]
  },
  {
    id: 4,
    title: 'Date of Birth',
    icon: 'birthday',
    desc: [<span className="gx-link" key={4}>26/09/1998</span>]
  }, {
    id: 5,
    title: 'Phone',
    icon: 'phone',
    desc: [<span className="gx-link" key={5}>(+84)325760088</span>]
  }, {
    id: 6,
    title: 'Sex',
    icon: 'user-o',
    desc: [<span className="gx-link" key={6}>Male</span>]
  },
];

const Contact = () => {
  return (
    <Widget styleName="gx-card-profile-sm">
      <br />
      <Row justify="center" >
        <Avatar className="gx-size-90" alt="..." src={"https://via.placeholder.com/150x150"} />
      </Row>
      <br />
      <Row justify="center"><h4>Jack Wiliams</h4></Row>
      <br />
      {contactList.map((data, index) =>
        <div key={index} className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-${data.icon} gx-fs-xxl gx-text-grey`} />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">{data.title}</span>
            <p className="gx-mb-0">{data.desc}</p>
          </div>
        </div>
      )}
    </Widget>
  )
}

export default Contact;
