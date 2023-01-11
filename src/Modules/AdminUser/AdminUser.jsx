import React, { useState, useEffect } from "react";
// styled component
import styled from "styled-components";
// my hooks
import Pagination from "../../Components/Paginate/Pagination";
//fetcher
import AuthAPI from "../../services/AuthAPI";
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
// slices action
import { handleChoose, doneEdit } from "../../slices/AuthSlices";
import RegistedModal from "./RegistedUser/RegistedModal";

const AdminUser = () => {
  const [users, setUsers] = useState([]); // state array user
  const [searchUser, setSearchUser] = useState(null); // state search term
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

  // request API func lấy danh sách user || tìm kiếm user
  const fetchAPI = async () => {
    if (!searchUser) {
      try {
        const data = await AuthAPI.getUserList();
        setUsers(data);
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const data = await AuthAPI.getUserList(searchUser);
        setUsers(data);
        // mỗi lần search thì set currenPage về lại 1 cho ng dùng xem
        setCurrentPage(1);
      } catch (error) {
        alert(error);
      }
    }
  };

  // lifecycle thực thi func fetchAPI
  useEffect(() => {
    fetchAPI();
  }, [searchUser]);

  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 10; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = users.slice(indexOfFirstItem, indexOfLastItem); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(users.length / itemPerPage); // tổng số trang

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

  // hàm tăng số lượng trang
  const IncreasePage = () => {
    console.log(maxPageNumberLimit);
    setMaxPageNumberLimit((state) => state + pageNumberLimit);
    setMinPageNumberLimit((state) => state + pageNumberLimit);
    setCurrentPage(maxPageNumberLimit + 1);
  };

  // hàm giảm số lượng trang
  const DecreasePage = () => {
    setMaxPageNumberLimit((state) => state - pageNumberLimit);
    setMinPageNumberLimit((state) => state - pageNumberLimit);
    setCurrentPage(minPageNumberLimit - pageNumberLimit + 1);
  };

  // func tìm kiếm ng dùng
  const handleSearch = (evt) => {
    evt.preventDefault();
    setSearchUser(evt.target[0].value);
  };

  // func thêm người dùng
  const handleAddUser = () => {
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập để thực hiện chức năng này",
        icon: "warning",
        button: true,
      });
      return;
    }
    // dispatch set state chooseUser = null để tránh trường hợp có giá trị state chooseUser thì sẽ nó sẽ thực hiện edit
    dispatch(doneEdit());
    // điều hướng sang trang /quanLyNguoiDung
    navigate("/quanLyNguoiDung");
  };

  // func xóa ng dùng
  const handleDelete = (taiKhoan) => {
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập để thực hiện chức năng này",
        icon: "warning",
        button: true,
      });
      return;
    }
    swal({
      text: "Bạn muốn xóa người dùng này ???",
      icon: "warning",
      buttons: ["Không", "Đúng vậy"],
    }).then(async (response) => {
      if (response) {
        try {
          await AuthAPI.deleteUser(taiKhoan);
          // xóa thành công => gọi làm hàm fetchAPI
          fetchAPI();
          swal({
            text: "Xóa người dùng thành công",
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
    dispatch(handleChoose(item));
    navigate("/quanLyNguoiDung");
  };

  return (
    <StyleAdminUser>
      <div className="container searchUser">
        <h1>Danh Sách Người Dùng</h1>
        <div className="searchInput">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(evt) => handleSearch(evt)}
          >
            <TextField
              id="outlined-basic"
              label="Nhập tên người dùng"
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
        <button className="btn btn-success" onClick={handleAddUser}>
          Thêm người dùng
        </button>
      </div>

      <div className="container mt-4 table-responsive">
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tài Khoản</th>
              <th>Loại người dùng</th>
              <th>Họ Tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.taiKhoan}</td>
                <td>{item.maLoaiNguoiDung}</td>
                <td>{item.hoTen}</td>
                <td>{item.email}</td>
                <td>{item.soDt}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.taiKhoan)}
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
        {users.length <= itemPerPage ? null : (
          <Pagination
            totalPageNumber={totalPageNumber}
            currentPage={currentPage}
            paginate={handleChangeCurrenPage}
            handleNextBtn={handleNextBtn}
            handlePrevBtn={handlePrevBtn}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            IncreasePage={IncreasePage}
            DecreasePage={DecreasePage}
          />
        )}
      </div>
      {/* modal */}
      <RegistedModal
        show={show}
        handleOpenModal={handleOpenModal}
        chooseUserToRegisted={chooseUserToRegisted}
      />
    </StyleAdminUser>
  );
};

export default AdminUser;

const StyleAdminUser = styled.div`
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
