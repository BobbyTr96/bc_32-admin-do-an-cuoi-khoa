import React, { useEffect, useState } from "react";
// router
import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
//fetcher
import AuthAPI from "../../../services/AuthAPI";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// swal
import swal from "sweetalert";
// react hook form
import { useForm } from "react-hook-form";
// slices action
import { doneEdit } from "../../../slices/AuthSlices";

const EditUser = () => {
  const { chooseUser } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues: {
        taiKhoan: chooseUser?.taiKhoan,
        matKhau: chooseUser?.matKhau,
        hoTen: chooseUser?.hoTen,
        soDT: chooseUser?.soDt,
        maLoaiNguoiDung: chooseUser?.maLoaiNguoiDung,
        email: chooseUser?.email,
    },
    mode: "onBlur",
  });
  const { errors } = formState; // biến quản lý thông báo lỗi của useForm

  const submit = async (value) => {
    // nếu có thông tin chọn ng dùng thì thực hiện edit
    if (chooseUser) {
      try {
        await AuthAPI.editUser(value);
        dispatch(doneEdit());
        swal({
          text: "Cập nhật thông tin thành công",
          icon: "success",
          button: true,
        });
        // cập nhật thành công điều hướng về trang chủ
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      // không có thì thực hiện chức năng thêm mới
      try {
        await AuthAPI.addUser(value);
        swal({
          text: "Thêm người dùng thành công",
          icon: "success",
          button: true,
        });
        // reset rỗng ô input
        reset({
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          soDT: "",
          maLoaiNguoiDung: "",
          email: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <div className="container ">
        {chooseUser ? <h1>Edit người dùng</h1> : <h1>Thêm Người Dùng</h1>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
        >
          <TextField
            disabled={chooseUser ? true : false}
            label="Tài Khoản"
            variant="outlined"
            {...register("taiKhoan", {
              required: { value: true, message: "Tài khoản ko đc bỏ trống" },
            })}
          />
          {errors.taiKhoan && (
            <span className="text-danger">{errors.taiKhoan.message}</span>
          )}

          {chooseUser ? null : (
            <>
              <TextField
                label="Mật khẩu"
                variant="outlined"
                type="password"
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không đc bỏ trống",
                  },
                })}
              />
              {errors.matKhau && (
                <span className="text-danger">{errors.matKhau.message}</span>
              )}
            </>
          )}

          <TextField
            label="Họ Tên"
            variant="outlined"
            {...register("hoTen", {
              required: { value: true, message: "Họ tên ko đc bỏ trống" },
            })}
          />
          {errors.hoTen && (
            <span className="text-danger">{errors.hoTen.message}</span>
          )}
          <TextField
            label="Email"
            variant="outlined"
            {...register("email", {
              required: { value: true, message: "Email ko đc bỏ trống" },
            })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
          <TextField
            label="Số ĐT"
            variant="outlined"
            type="number"
            {...register("soDT", {
              required: { value: true, message: "Số dt ko đc bỏ trống" },
            })}
          />
          {errors.soDT && (
            <span className="text-danger">{errors.soDT.message}</span>
          )}
          <select
            defaultChecked={chooseUser ? chooseUser.maLoaiNguoiDung : ""}
            {...register("maLoaiNguoiDung", {
              required: {
                value: true,
                message: "Vui lòng chọn loại người dùng",
              },
            })}
          >
            <option value="">Chọn người dùng</option>
            <option value="HV">Học Viên</option>
            <option value="GV">Giáo Viên</option>
          </select>

          {errors.maLoaiNguoiDung && (
            <span className="text-danger">
              {errors.maLoaiNguoiDung.message}
            </span>
          )}
          {chooseUser ? (
            <button className="btn btn-primary mt-4">Cập Nhật</button>
          ) : (
            <button className="btn btn-success mt-4">Thêm mới</button>
          )}
          {/* {error && <span className="text-danger">{error}</span>} */}
        </Box>
      </div>
    </div>
  );
};

export default EditUser;
