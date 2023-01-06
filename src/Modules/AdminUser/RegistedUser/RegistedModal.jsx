import React, { useState, useEffect } from "react";
//material ui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// bootstrap
import Modal from "react-bootstrap/Modal";
//redux
import { useSelector, useDispatch } from "react-redux";
// fetchet
import CourseAPI from "../../../services/CourseAPI";
// swal
import swal from "sweetalert";
// components
import ValidateCourse from "./ValidateCourse/ValidateCourse";
import RegistedCourse from "./RegistedCourse/RegistedCourse";

const RegistedModal = ({ show, handleOpenModal, chooseUserToRegisted }) => {
  const [courses, setCourses] = useState([]); //state array course chưa đăng kí
  const [chooseCourse, setChooseCourse] = useState(null); // state chọn khóa học để ghi danh
  const [courseApprovals, setCourseApprovals] = useState([]); // state array khóa học chờ xác thực
  const [registedCourses, setRegistedCourses] = useState([]); // state array khóa học đã ghi danh
  // func đóng khi đóng modal => reset lại toàn bộ state
  const handleClose = () => {
    // reset state
    setCourses([]);
    setCourseApprovals([]);
    setRegistedCourses([]);
    setChooseCourse(null);
    // gọi hàm đóng modal ở component cha
    handleOpenModal();
  };

  // func request API lấy arr khóa học chờ xét duyệt
  const fetchCourseValidate = async () => {
    try {
      const data = await CourseAPI.getValitdateCourses(chooseUserToRegisted);
      setCourseApprovals(data);
    } catch (error) {
      alert(error);
    }
  };

  // func request API lấy arr khóa học đã ghi dannh
  const fetchRegistedCourses = async () => {
    try {
      const data = await CourseAPI.getRegistedCourses(chooseUserToRegisted);
      setRegistedCourses(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    //  nếu ko có người dùng nào đc chọn => ko thực hiện logic
    if (!chooseUserToRegisted) {
      return;
    }

    // request API lấy arr khóa học chưa đăng ký
    (async () => {
      try {
        const data = await CourseAPI.getUnRegistedCourse(chooseUserToRegisted);
        // set state array khóa học chưa đăng ký của user
        setCourses(data);
      } catch (error) {
        alert(error);
      }
    })();

    //request API lấy arr khóa học chờ xác thực
    fetchCourseValidate();

    // request API lấy arr khóa học đã ghi danh
    fetchRegistedCourses();
  }, [chooseUserToRegisted]);

  // func ghi danh khóa học
  const handleRegister = async () => {
    // nếu chưa chọn khóa học thì hiện thông báo cho admin
    if (!chooseCourse) {
      swal({
        text: "Vui lòng chọn khóa học muốn ghi danh",
        button: true,
        icon: "warning",
      });
      return;
    }

    try {
      await CourseAPI.registerCourse({
        taiKhoan: chooseUserToRegisted,
        maKhoaHoc: chooseCourse,
      });
      // // nếu đã chọn thì thực hiện request api hàm fetchCourseValidate đề cập nhật lại danh sách khóa học chờ ghi danh
      fetchRegistedCourses();
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
      <Modal.Header className="headModal-registed">
        <div className="headModal-title">
          <h4>Chọn khóa học</h4>
          <button className="btn-close" onClick={handleClose}></button>
        </div>
        <div className="headModal-chooseCourse">
          {/* select khóa học */}
          <select
            className="headModal-select"
            onChange={(evt) => setChooseCourse(evt.target.value)}
          >
            <option value="">***Chọn khóa học để ghi danh***</option>
            {courses.map((item) => (
              <option key={item.maKhoaHoc} value={item.maKhoaHoc}>
                {item.biDanh}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={handleRegister}>
            Ghi Danh
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        {/* khóa học chờ xác thực */}
        <ValidateCourse
          userAccount={chooseUserToRegisted}
          courseApprovals={courseApprovals}
          fetchCourseValidate={fetchCourseValidate}
        />

        {/* Các khóa học người dùng đã ghi danh */}
        <RegistedCourse
          userAccount={chooseUserToRegisted}
          registedCourses={registedCourses}
          fetchRegistedCourses={fetchRegistedCourses}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RegistedModal;
