import React, { useState } from "react";
// my img
import logo from "../../../img/cyberlogo-white.png";
// bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";

const NavCanvas = ({ show, handleOpen, user, handleLogout }) => {
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
                  <p>
                    <a href="/dangKy">Đăng ký</a>
                  </p>
                  <p>
                    <a href="/dangNhap">Đăng nhập</a>
                  </p>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NavCanvas;
