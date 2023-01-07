import React, { useState, useEffect } from "react";
//material ui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// bootstrap
import Modal from "react-bootstrap/Modal";

// fetchet
import AuthAPI from "../../../services/AuthAPI";
import CourseAPI from "../../../services/CourseAPI";
// swal
import swal from "sweetalert";
// components
import UserValidate from "./UserValidate/UserValidate";
import UserAttendedCourse from "./UserAttendedCourse/UserAttendedCourse";


const RegistedCourseModal = ({ show, handleOpenModal, maKhoaHoc }) => {
  const [userUnRegisteds, setUserUnRegisteds] = useState([]); //state array course user chưa đăng kí
  const [cloneUserUnRegisteds, setCloneUserUnRegisteds] = useState([]); // clone state array khóa học chưa đăng ký của user dùng cho hàm search

  const [chooseUser, setChooseUser] = useState(""); // state chọn người dùng để ghi danh
  const [userApprovals, setUserApprovals] = useState([]); // state array user chờ xác thực
  const [userAttendeds, setUserAttendeds] = useState([]); // state array user đã ghi danh
  // func đóng khi đóng modal => reset lại toàn bộ state

  const handleClose = () => {
    // reset state
    setUserUnRegisteds([]);
    setUserApprovals([]);
    setUserAttendeds([]);
    setChooseUser("");
    // gọi hàm đóng modal ở component cha
    handleOpenModal();
  };

  // func tìm kiếm
  const handleSearch = (evt) => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    // biến search value thành chữ thường
    const searchValue = evt.target[0].value.toLowerCase();
    //  dùng hàm filter lọc dk
    const newSearchItem = userUnRegisteds.filter((item) => {
      const newItem = item.hoTen.toLowerCase();
      return newItem.includes(searchValue);
    });
    // set lại giá trị cloneUserUnRegisteds
    setCloneUserUnRegisteds(newSearchItem);
    // set lại giá trị select ng dùng = null
    setChooseUser("");
  };

  // func request API lấy arr user chờ xét duyệt
  const fetchUserValidate = async () => {
    try {
      const data = await AuthAPI.getUserWaitForValidate(maKhoaHoc);
      setUserApprovals(data);
    } catch (error) {
      alert(error);
    }
  };

  // func request API lấy arr khóa học đã ghi dannh
  const fetchUserAttended = async () => {
    try {
      const data = await AuthAPI.getUserAttendedCourses(maKhoaHoc);
      setUserAttendeds(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    //  nếu ko có khóa nào nào đc chọn => ko thực hiện logic
    if (!maKhoaHoc) {
      return;
    }

    // request API lấy arr ng dùng chưa đăng ký
    (async () => {
      try {
        const data = await AuthAPI.getUsersUnregistedCourse(maKhoaHoc);
        // set state array khóa học chưa đăng ký của user
        setUserUnRegisteds(data);
        // set state clone array khóa học chưa đăng ký của user
        setCloneUserUnRegisteds(data);
      } catch (error) {
        alert(error);
      }
    })();

    // //request API lấy arr user chờ xác thực
    fetchUserValidate();

    // // request API lấy arr user đã ghi danh
    fetchUserAttended();
  }, [maKhoaHoc]);

  // func ghi danh người dùng
  const handleRegister = async () => {
    // nếu chưa chọn khóa học thì hiện thông báo cho admin
    if (!chooseUser) {
      swal({
        text: "Vui lòng chọn người dùng muốn ghi danh",
        button: true,
        icon: "warning",
      });
      return;
    }

    try {
      await CourseAPI.registerCourse({
        taiKhoan: chooseUser,
        maKhoaHoc: maKhoaHoc,
      });
      // // nếu đã chọn thì thực hiện request api hàm fetchCourseValidate đề cập nhật lại danh sách khóa học chờ ghi danh
      fetchUserAttended();
      // hiện thôn báo thành công
      swal({
        text: "Ghi danh thành công",
        button: true,
        icon: "success",
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="registed-modal">
      <Modal.Header className="headModal-userRegisted">
        <div className="headModal-userRegisted__title">
          <h4>Chọn người dùng</h4>
          <button className="btn-close" onClick={handleClose}></button>
        </div>
        {/* search input */}
        <div className="headModal-userRegisted__search">
          <Box
            component="form"
            noValidate
            onSubmit={(evt) => handleSearch(evt)}
          >
            <TextField
              size="small"
              label="Nhập tên người dùng"
              variant="outlined"
            />
            <span>
              <button className="btn btn-primary">Tìm kiếm</button>
            </span>
          </Box>
        </div>
        <div className="headModal-userRegisted__chooseUser">
          {/* select ng dùng */}
          <select
            value={chooseUser}
            className="headModal-userRegisted__select"
            onChange={(evt) => setChooseUser(evt.target.value)}
          >
            <option value="">***Chọn người dùng****</option>
            {cloneUserUnRegisteds.map((item) => (
              <option key={item.taiKhoan} value={item.taiKhoan}>
                {item.hoTen}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={handleRegister}>
            Ghi Danh
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        {/* học viên chờ xác thực */}
        <UserValidate
          maKhoaHoc={maKhoaHoc}
          userApprovals={userApprovals}
          fetchUserValidate={fetchUserValidate}
        />

        {/* Các khóa học người dùng đã ghi danh */}
        <UserAttendedCourse
        userAttendeds={userAttendeds}
        maKhoaHoc={maKhoaHoc}
        fetchUserAttended={fetchUserAttended}
     
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RegistedCourseModal;
