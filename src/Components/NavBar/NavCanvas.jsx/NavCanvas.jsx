import React, { useState } from "react";
// my img
import logo from "../../../img/cyberlogo-white.png";
// bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";

const NavCanvas = ({
  show,
  handleOpen,
  user,
  handleLogout,
  handleOpenModal,
}) => {
  return (
    <Offcanvas show={show} onHide={handleOpen}>
      <Offcanvas.Header>
        <Offcanvas.Title>
          <a href="/">
            <img src={logo} alt="" height={50} />
          </a>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* user */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {user ? (
                <p className="text-black">
                  <sup>Xin chào </sup>
                  <b>{user.hoTen}</b>
                </p>
              ) : (
                "User"
              )}
            </Accordion.Header>
            <Accordion.Body>
              {user ? (
                <div className=" flex-column d-flex ">
                  <p>
                    <a href="/thongTinNguoiDung">Thông tin người dùng</a>
                  </p>
                  <div>
                    <button
                      className="btn btn-primary my-2"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <div className="authen ">
                  <button className="btn btn-primary" onClick={handleOpenModal}>
                    Đăng nhập
                  </button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* link direction */}
        <div className="d-flex flex-column my-3">
          <a href="/" >
            Quản lý người dùng
          </a>
          <a href="/quanLyKhoaHoc">Quản lý khóa học</a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NavCanvas;
