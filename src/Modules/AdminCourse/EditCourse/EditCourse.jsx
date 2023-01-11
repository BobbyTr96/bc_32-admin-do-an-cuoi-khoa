import React, { useEffect, useState } from "react";
// router
import { useNavigate } from "react-router-dom";
//fetcher
import CourseAPI from "../../../services/CourseAPI";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// redux
import { useSelector } from "react-redux";
// swal
import swal from "sweetalert";
// react hook form
import { useForm } from "react-hook-form";
// styled
import styled from "styled-components";

const EditCourse = () => {
  const course = JSON.parse(sessionStorage.getItem("chooseCourse")) || null; // biến lưu trữ khóa học muốn thay đổi
  const { user } = useSelector((state) => state.Auth); // lấy thông tin user từ redux
  const [courseCatalogs, setCourseCatalogs] = useState([]); // state arr danh mục khóa học
  const [maKhoaHoc, setMaKhoaHoc] = useState(
    course ? course.danhMucKhoaHoc.maDanhMucKhoahoc : ""
  ); // state select maKhoaHoc ở input select
  const userAccount = user.taiKhoan; // biến lưu trữ taiKhoan của user
  const [img, setImg] = useState(course?.hinhAnh); // state lưu trữ hình ảnh đã đc biến đổi sang base64
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues: course
      ? {
          maKhoaHoc: course.maKhoaHoc,
          tenKhoaHoc: course.tenKhoaHoc,
          moTa: course.moTa,
          luotXem: course.luotXem,
          danhGia: 0,
          hinhAnh: course.hinhAnh,
          maNhom: course.maNhom,
          ngayTao: course.ngayTao,
          maDanhMucKhoaHoc: course.danhMucKhoaHoc.maDanhMucKhoahoc,
          taiKhoanNguoiTao: course.nguoiTao.taiKhoan,
        }
      : {
          maKhoaHoc: "",
          tenKhoaHoc: "",
          moTa: "",
          luotXem: 0,
          danhGia: 0,
          hinhAnh: "",
          maNhom: "",
          ngayTao: "",
          maDanhMucKhoaHoc: "",
          taiKhoanNguoiTao: userAccount,
        },
    mode: "onBlur",
  });
  const { errors } = formState; // biến quản lý thông báo lỗi của useForm

  useEffect(() => {
    (async () => {
      try {
        const data = await CourseAPI.getCourseCatalog();
        //set lại state arr danh mục khóa học
        setCourseCatalogs(data);
        console.log(data[0].maDanhMuc);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  // func chọn hình ảnh
  const handleChangeImg = (evt) => {
    const file = evt.target.files[0];

    if (!file) return;
    // setValue cho input hinhAnh của react-hook-form bằng thủ công
    setValue("hinhAnh", file);
    // xử lý hiển thị image ==>  bằng 1 built-in class của js ==> new FileReader()
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // .readAsDataURL() => parse file object thành file nhị phân ==> là tác vụ bất đồng bộ

    //.onload là callback func giúp lấy được dữ liệu hình ảnh từ bất đồng bộ
    fileReader.onload = (evt) => {
      setImg(evt.target.result);
    };
  };

  //===============
  const submit = async (value) => {
    const payload = { ...value, maNhom: "GP01" };

    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    // call api edit phim
    try {
      // nếu có thông tin edit thì call api update , không thì add
      if (!course) {
        await CourseAPI.addCourse(formData);
      } else {
        if (typeof value.hinhAnh === "string") {
          await CourseAPI.editCourseWithoutImage(payload);
        } else {
          await CourseAPI.editCourse(formData);
        }
      }

      // call thành công thì hiện thông báo
      swal({
        text: "Xử lý thành công",
        icon: "success",
        button: false,
        timer: 1300,
      });

      // reset field input
      reset({
        maKhoaHoc: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 0,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "",
        ngayTao: "",
        maDanhMucKhoaHoc: "",
        taiKhoanNguoiTao: "",
      });
      //set lại hình ảnh = null
      setImg(null);
      // chuyển về lại trang quanLyKhoaHoc
      setTimeout(() => {
        navigate("/quanLyKhoaHoc");
      }, 1500);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <StyleEditCourse>
      <div className="container ">
        {course ? <h1>Edit khóa học</h1> : <h1>Thêm khóa học</h1>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
        >
          <div className="input-area">
            {/* ==== leftside input ==== */}
            <div className="leftside-input">
              <div className="input-items">
                <TextField
                  disabled={course ? true : false}
                  label="Mã khóa học"
                  variant="outlined"
                  {...register("maKhoaHoc", {
                    required: {
                      value: true,
                      message: "Mã khóa học ko đc bỏ trống",
                    },
                  })}
                />
                {errors.maKhoaHoc && (
                  <span className="text-danger">
                    {errors.maKhoaHoc.message}
                  </span>
                )}
              </div>

              <div className="input-items">
                <TextField
                  label="Tên khóa học"
                  variant="outlined"
                  type="text"
                  {...register("tenKhoaHoc", {
                    required: {
                      value: true,
                      message: "Tên khóa học không đc bỏ trống",
                    },
                  })}
                />
                {errors.tenKhoaHoc && (
                  <span className="text-danger">
                    {errors.tenKhoaHoc.message}
                  </span>
                )}
              </div>

              <div className="input-items">
                <FormControl fullWidth>
                  <Select
                    native={true}
                    value={maKhoaHoc}
                    {...register("maDanhMucKhoaHoc", {
                      required: {
                        value: true,
                        message: "Vui lòng chọn danh mục khóa học",
                      },
                      onChange: (value) => setMaKhoaHoc(value.target.value),
                    })}
                  >
                    {/* disabled={course ? true : false} */}
                    <option value="">***Chọn danh mục khóa học***</option>
                    {courseCatalogs.map((item) => (
                      <option key={item.maDanhMuc} value={item.maDanhMuc}>
                        {item.tenDanhMuc}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {errors.maDanhMucKhoaHoc && (
                  <span className="text-danger">
                    {errors.maDanhMucKhoaHoc.message}
                  </span>
                )}
              </div>

              <div className="input-items">
                <TextField
                  label="Ngày tạo"
                  variant="outlined"
                  {...register("ngayTao", {
                    required: {
                      value: true,
                      message: "Vui lòng chọn ngày tạo",
                    },
                  })}
                />
                {errors.ngayTao && (
                  <span className="text-danger">{errors.ngayTao.message}</span>
                )}
              </div>
            </div>

            {/*===== rightside input===== */}
            <div className=" rightside-input">
              <div className="input-items">
                <TextField
                  label="Đánh giá"
                  variant="outlined"
                  type="number"
                  {...register("danhGia", {
                    required: {
                      value: true,
                      message: "Vui lòng thêm đánh giá",
                    },
                  })}
                />
                {errors.danhGia && (
                  <span className="text-danger">{errors.danhGia.message}</span>
                )}
              </div>

              <div className="input-items">
                <TextField
                  label="Lượt xem"
                  variant="outlined"
                  type="number"
                  {...register("luotXem", {
                    required: {
                      value: true,
                      message: "Vui lòng thêm lượt xem",
                    },
                  })}
                />
                {errors.luotXem && (
                  <span className="text-danger">{errors.luotXem.message}</span>
                )}
              </div>

              <div className="input-items">
                <FormControl fullWidth>
                  <InputLabel>Người tạo</InputLabel>
                  <Select
                    native={true}
                    value={course ? course.nguoiTao.taiKhoan : userAccount}
                    label=" Người tạo"
                    {...register("taiKhoanNguoiTao", {
                      required: {
                        value: true,
                        message: "Vui lòng thêm người tạo",
                      },
                    })}
                  >
                    <option
                      value={course ? course.nguoiTao.taiKhoan : userAccount}
                    >
                      {course ? course.nguoiTao.hoTen : user.hoTen}
                    </option>
                  </Select>
                </FormControl>
                {errors.taiKhoanNguoiTao && (
                  <span className="text-danger">
                    {errors.taiKhoanNguoiTao.message}
                  </span>
                )}
              </div>

              <div className="input-items">
                <TextField
                  variant="outlined"
                  type="file"
                  onChange={(evt) => handleChangeImg(evt)}
                />
                {errors.hinhAnh && (
                  <span className="text-danger">{errors.hinhAnh.message}</span>
                )}
                {img && (
                  <img
                    className="my-2"
                    src={img}
                    alt="Onerror"
                    width={150}
                    height={200}
                  />
                )}
              </div>
            </div>
          </div>

          {/* bottom input */}
          <div className="bottom-input">
            <TextField
              id="outlined-multiline-static"
              label="Mô tả"
              multiline
              rows={4}
              {...register("moTa", {
                required: {
                  value: true,
                  message: "Vui lòng thêm mô tả",
                },
              })}
            />
            {errors.moTa && (
              <span className="text-danger">{errors.moTa.message}</span>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <a href="/quanLyKhoaHoc">Trở về</a>
            {course ? (
              <button className="btn btn-primary ">Cập Nhật</button>
            ) : (
              <button className="btn btn-success ">Thêm mới</button>
            )}
            {error && <span className="text-danger">{error}</span>}
          </div>
        </Box>
      </div>
    </StyleEditCourse>
  );
};

export default EditCourse;

const StyleEditCourse = styled.div`
  margin-top: 60px;

  .input-area {
    display: flex;
    justify-content: space-between;

    .leftside-input,
    .rightside-input {
      width: 45%;

      .input-items {
        margin: 10px 0;
      }
      .MuiTextField-root {
        width: 100%;
      }
    }
  }

  .bottom-input {
    .MuiTextField-root {
      width: 100%;
    }
  }
`;
