import React, { useState, useEffect } from "react";
// bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
// styled component
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";
// my img
import logo from "../../img/cyberlogo-white.png";
// components
import NavCanvas from "./NavCanvas.jsx/NavCanvas";
import NavModal from "./NavModal/NavModal";
// slice
import { logOut } from "../../slices/AuthSlices";
import swal from "sweetalert";

const AdminNavBar = () => {
  const [showCanvas, setShowCanvas] = useState(false); // state control canvas
  const [showMadal, setShowModal] = useState(false); // state control modal
  const [scrolling, setScrolling] = useState(0); //state control scrolling navbar
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.Auth);
  // func control canvas
  const handleOpenCanvas = () => {
    setShowCanvas((state) => !state);
  };

  // func control modal
  const handleOpenModal = () => {
    setShowModal((state) => !state);
  };

  // func scroll navbar
  const handleScroll = () => {
    const croll = window.scrollY;
    setScrolling(croll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // func logout
  const handleLogout = () => {
    swal({
      title: "Bạn Muốn Đăng Xuất ???",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        swal({
          text: "Cảm ơn và hẹn gặp lại",
          icon: "success",
          timer: 2000,
          button: false,
        });
        dispatch(logOut());
      }
    });
  };

  return (
    <StyleNavBar>
      <Navbar
     
        expand="lg"
        variant="dark"
        onToggle={handleOpenCanvas}
        expanded={false}
        style={
          scrolling > 60
            ? {
                position: "fixed",
                top: "0",
                width: "100%",
                zIndex: "10",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              }
            : { position: "relative", backgroundColor: "rgb(0, 0, 0)" }
        }
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="" height={50} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user ? (
                <>
                  <div className="d-flex align-items-center">
                    <p className="text-white" style={{ marginRight: "10px" }}>
                      <sup>Xin chào </sup>
                      <b>{user.hoTen}</b>
                    </p>
                    <Dropdown align={"end"}>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="userDropdown"
                      />

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="/thongTinNguoiDung"
                          className="text-center text-dark"
                        >
                          Thông tin
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={handleLogout}
                          className="text-center"
                          as="button"
                        >
                          Đăng xuất
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleOpenModal}>
                  Đăng Nhập
                </button>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* canvas */}
      <NavCanvas
        show={showCanvas}
        handleOpen={handleOpenCanvas}
        user={user}
        handleLogout={handleLogout}
      />

      {/* modal */}
      {user ? null : (
        <NavModal
          showMadal={showMadal}
          handleOpenModal={handleOpenModal}
          error={error}
          loading={loading}
          user={user}
        />
      )}
    </StyleNavBar>
  );
};

export default AdminNavBar;
const StyleNavBar = styled.div`
  .navbar-text {
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
