import React from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//hook-form
import { useForm } from "react-hook-form";
// redux
import { useDispatch } from "react-redux";
// slices
import { logIn } from "../../../slices/AuthSlices";
import swal from "sweetalert";

const NavModal = ({ showMadal, handleOpenModal, error, loading, user }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onBlur",
  });

  const { errors } = formState; // hàm chứa lỗi từ formState

  const onSubmit = (values) => {
    dispatch(logIn(values));
  };

  
  return (
    <Modal show={showMadal} onHide={handleOpenModal}>
      <Modal.Header className="navModal-header">
        <Modal.Title>Đăng Nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body className="navModal-body">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { my: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            autoComplete="taiKhoan"
            label="Tài Khoản"
            variant="outlined"
            error={false}
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài khoản ko đc để trống",
              },
            })}
          />
          {errors.taiKhoan && (
            <span className="text-danger">{errors.taiKhoan.message}</span>
          )}
          <TextField
            autoComplete="matKhau"
            label="Mật Khẩu"
            type="password"
            variant="outlined"
            error={false}
            {...register("matKhau", {
              required: {
                value: true,
                message: "Mật khẩu ko đc để trống",
              },
            })}
          />
          {errors.matKhau && (
            <span className="text-danger">{errors.matKhau.message}</span>
          )}

          <div className="text-center mt-2">
            <button className="btn btn-success">Đăng nhập</button>
          </div>
          {error && (
            <div className="text-center">
              <span className="text-danger">{error.message}</span>
            </div>
          )}
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default NavModal;
