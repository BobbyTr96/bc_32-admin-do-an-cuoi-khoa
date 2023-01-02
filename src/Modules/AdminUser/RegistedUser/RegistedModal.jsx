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

const RegistedModal = ({ show, handleOpenModal, user }) => {
  const [courses, setCourses] = useState([]); //state array course chưa đăng kí

  useEffect(() => {
    (async () => {
      try {
        const data = await CourseAPI.getUnRegistedCourse(user);
        setCourses(courses);
      } catch (error) {
        console.log();
      }
    })();
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleOpenModal}
      chooseUserToRegisted="modalRegisted"
      dialogClassName="registed-modal"
    >
      <Modal.Header className="headModal-registed">
        <div className="headModal-title">
          <h4>Chọn khóa học</h4>
          <button className="btn-close" onClick={handleOpenModal}></button>
        </div>
        <div className="headModal-chooseCourse">
          <FormControl sx={{ width: "80%" }} size="small">
            <InputLabel>Khóa học</InputLabel>
            <Select
              className="headModal-select"
              //   value={age}
              label="Khóa học"
              //   onChange={handleChange}
            >
              <MenuItem value="">1</MenuItem>
            </Select>
          </FormControl>
          <button className="btn btn-primary">Ghi Danh</button>
        </div>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RegistedModal;
