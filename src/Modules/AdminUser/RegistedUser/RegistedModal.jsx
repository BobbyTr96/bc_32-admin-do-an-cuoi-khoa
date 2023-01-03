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
// fetchet
import CourseAPI from "../../../services/CourseAPI";

const RegistedModal = ({ show, handleOpenModal, chooseUserToRegisted }) => {
  const [courses, setCourses] = useState([]); //state array course chưa đăng kí
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (!chooseUserToRegisted) {
      return;
    } else {
      (async () => {
        try {
          const data = await CourseAPI.getUnRegistedCourse(
            chooseUserToRegisted
          );
          // set state array khóa học chưa đăng ký của user
          setCourses(data);
          console.log(data);
        } catch (error) {
          console.log();
        }
      })();
    }
  }, [chooseUserToRegisted]);

  return (
    <Modal
      show={show}
      onHide={handleOpenModal}
      dialogClassName="registed-modal"
    >
      <Modal.Header className="headModal-registed">
        <div className="headModal-title">
          <h4>Chọn khóa học</h4>
          <button className="btn-close" onClick={handleOpenModal}></button>
        </div>
        <div className="headModal-chooseCourse">
          {/* select khóa học */}

          <select className="headModal-select">
            {courses.map((item) => (
              <option key={item.maKhoaHoc} value={item.maKhoaHoc}>
                {item.biDanh}
              </option>
            ))}
          </select>

          <button className="btn btn-primary">Ghi Danh</button>
        </div>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal 123!</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RegistedModal;
