import React, { useState, useEffect } from "react";
// styled component
import styled from "styled-components";
// my hooks
import Pagination from "../../Components/Paginate/Pagination";
//fetcher
import CourseAPI from "../../services/CourseAPI";
//material ui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// redux
import { useDispatch, useSelector } from "react-redux";
// router
import { useNavigate } from "react-router-dom";
// icons
import { FcSearch } from "react-icons/fc";
import swal from "sweetalert";


const AdminCourse = () => {
  const [courses, setCourses] = useState([]); // state array courses
  const [searchCourse, setSearchCourse] = useState(null); // state search term
  const [show, setShow] = useState(false); // control modal
  const [chooseUserToRegisted, setChooseUserToRegisted] = useState(null); //state chọn người dùng để ghi danh khóa học
  const { user } = useSelector((state) => state.Auth); // redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //func open modal + ghi danh
  const handleOpenModal = (taiKhoan) => {
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập để thực hiện chức năng này",
        icon: "warning",
        button: true,
      });
      return;
    }
    setChooseUserToRegisted(taiKhoan);
    setShow((state) => !state);
  };

  // fetch API func
  const fetchAPI = async () => {
    if (!searchCourse) {
      try {
        const data = await CourseAPI.getCourses();
        setCourses(data);
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const data = await CourseAPI.getCourses(searchCourse);
        setCourses(data);
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [searchCourse]);

  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 10; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = courses.slice(indexOfFirstItem, indexOfLastItem); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(courses.length / itemPerPage); // tổng số trang

  const [pageNumberLimit, setPageNumberLimit] = useState(5); // state giới hạn số trang hiển thị
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5); // state số lượng trang hiển thị tối đa
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0); // state số lượng trang hiển thị tối thiểu
  // hàm thay đổi số trang hiện tại

  const handleChangeCurrenPage = (number) => {
    setCurrentPage(number);
  };

  // hàm next trang tiếp theo
  const handleNextBtn = () => {
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit((state) => state + pageNumberLimit);
      setMinPageNumberLimit((state) => state + pageNumberLimit);
    }
    setCurrentPage((state) => state + 1);
  };
  // hàm prev  trang trước
  const handlePrevBtn = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit((state) => state - pageNumberLimit);
      setMinPageNumberLimit((state) => state - pageNumberLimit);
    }
    setCurrentPage((state) => state - 1);
  };

  // func tìm kiếm ng dùng
  const handleSearch = (evt) => {
    evt.preventDefault();
    setSearchCourse(evt.target[0].value);
  };

  // func thêm khóa học
  const handleAddCourse = () => {
    // bỏ thông tin edit đã lưu trước đó khỏi session storage
    sessionStorage.removeItem("chooseCourse");
    // điều hướng sang trang /quanLyNguoiDung
    navigate("add");
  };

  // func xóa khóa học
  const handleDelete = (maKhoaHoc) => {
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập để thực hiện chức năng này",
        icon: "warning",
        button: true,
      });
      return;
    }
    swal({
      text: "Bạn muốn xóa khóa học này ???",
      icon: "warning",
      buttons: ["Không", "Đúng vậy"],
    }).then(async (response) => {
      if (response) {
        try {
          await CourseAPI.deleteCourse(maKhoaHoc);
          // xóa thành công => gọi làm hàm fetchAPI để cập nhật lại arr
          fetchAPI();
          // thông báo xóa thành công
          swal({
            text: "Xóa khóa học thành công",
            icon: "success",
            button: true,
          });
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  // func edit người dùng
  const handleChooseUser = (item) => {
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập để thực hiện chức năng này",
        icon: "warning",
        button: true,
      });
      return;
    }
    // lưu thông tin khóa học muốn edit vào sessonStorage
    sessionStorage.setItem("chooseCourse", JSON.stringify(item));
    navigate("edit");
  };

  return (
    <StyleAdminCourse>
      <div className="container searchUser">
        <h1>Danh Sách Khóa Học</h1>
        <div className="searchInput" style={{ position: "relative" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(evt) => handleSearch(evt)}
          >
            <TextField
              id="outlined-basic"
              label="Nhập tên khóa học"
              variant="outlined"
            />
          </Box>
          <FcSearch
            style={{
              position: "absolute",
              right: "20px",
              top: "13px",
              fontSize: "30px",
            }}
          />
        </div>
      </div>
      <div className="container">
        <button className="btn btn-success" onClick={handleAddCourse}>
          Thêm khóa học
        </button>
      </div>

      <div className="container mt-4 table-responsive">
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã khóa học</th>
              <th>Tên khóa học</th>
              <th>Hinh ảnh</th>
              <th>Lượt xem</th>
              <th>Người tạo</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.maKhoaHoc}</td>
                <td>{item.tenKhoaHoc}</td>
                <td>
                  <img
                    src={item.hinhAnh}
                    alt="Onerror"
                    height={50}
                    width={50}
                  />
                </td>
                <td>{item.luotXem}</td>
                <td>{item.nguoiTao.hoTen}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.maKhoaHoc)}
                  >
                    Xóa
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleChooseUser(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleOpenModal(item.taiKhoan)}
                  >
                    Ghi danh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination */}
        {courses.length <= itemPerPage ? null : (
          <Pagination
            totalPageNumber={totalPageNumber}
            currentPage={currentPage}
            paginate={handleChangeCurrenPage}
            handleNextBtn={handleNextBtn}
            handlePrevBtn={handlePrevBtn}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
          />
        )}
      </div>
      {/* modal */}
      {/* <RegistedModal
        show={show}
        handleOpenModal={handleOpenModal}
        chooseUserToRegisted={chooseUserToRegisted}
      /> */}
    </StyleAdminCourse>
  );
};

export default AdminCourse;

const StyleAdminCourse = styled.div`
  margin-top: 30px;
  .searchUser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
      align-items: start;
    }

    h1 {
      @media only screen and (max-width: 992px) {
        font-size: 25px;
      }
    }

    .searchInput {
      position: relative;
      width: 50%;
      @media only screen and (max-width: 600px) {
        width: 100%;
      }
    }

    h1 {
      @media only screen and (max-width: 600px) {
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
  }

  table {
    @media only screen and (max-width: 600px) {
      font-size: 10px;
    }

    button {
      @media only screen and (max-width: 600px) {
        font-size: 8px;
        padding: 0 5px;
      }
    }
  }
`;
