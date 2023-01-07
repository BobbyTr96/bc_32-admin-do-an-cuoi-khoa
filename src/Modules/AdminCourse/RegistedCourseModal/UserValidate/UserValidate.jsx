import React, { useState } from "react";
// hooks
import Pagination from "../../../../Components/Paginate/Pagination";
// fetchet
import CourseAPI from "../../../../services/CourseAPI";
// swal
import swal from "sweetalert";

const UserValidate = ({ userApprovals, maKhoaHoc, fetchUserValidate }) => {
  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 2; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = userApprovals.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(userApprovals.length / itemPerPage); // tổng số trang

  // hàm thay đổi số trang hiện tại
  const handleChangeCurrenPage = (number) => {
    setCurrentPage(number);
  };

  // hàm next trang tiếp theo
  const handleNextBtn = () => {
    setCurrentPage((state) => state + 1);
  };
  // hàm prev  trang trước
  const handlePrevBtn = () => {
    setCurrentPage((state) => state - 1);
  };

  // func xác thực người dùng
  const handleRegister = async (taiKhoan) => {
    try {
      await CourseAPI.registerCourse({
        taiKhoan: taiKhoan,
        maKhoaHoc,
      });
      // nếu đã chọn thì thực hiện request api hàm fetchUserValidate đề cập nhật lại danh sách người dùng chờ ghi danh
      fetchUserValidate();
      // hiện thôn báo thành công
      swal({
        text: "xác thực thành công",
        button: true,
        icon: "success",
      });
      // setCurrentPage về lại trước đó 1 trang
      if (currentPageItems.length < itemPerPage)
        setCurrentPage((state) => state - 1);
    } catch (error) {
      alert(error);
    }
  };

  // func hủy khóa học chờ xác thực
  const handleDeleteUserValidate = (taiKhoan) => {
    swal({
      text: "bạn muốn hủy khóa học này ???",
      buttons: true,
      icon: "warning",
    }).then(async (response) => {
      if (response) {
        try {
          await CourseAPI.unRegisterCourse({
           taiKhoan,
            maKhoaHoc,
          });
          // nếu đã chọn thì thực hiện request api hàm fetchCourseValidate đề cập nhật lại danh sách khóa học chờ ghi danh
          fetchUserValidate();
          // hiện thôn báo thành công
          swal({
            text: "Hủy ghi danh thành công",
            button: true,
            icon: "success",
          });
          // setCurrentPage về lại trước đó 1 trang
          if (currentPageItems.length < itemPerPage)
            setCurrentPage((state) => state - 1);
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  return (
    <div className="container">
      {userApprovals.length === 0 ? (
        <h4>Không có khóa học chờ xác thực</h4>
      ) : (
        <>
          <h4>Khóa học chờ xác thực</h4>
          <div className="validate-course__list my-2 table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th>Chờ xác thực</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((item, index) => (
                  <tr key={item.taiKhoan}>
                    <td>{index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRegister(item.taiKhoan)}
                      >
                        Xác thực
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUserValidate(item.taiKhoan)}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {userApprovals.length > itemPerPage ? (
              <Pagination
                totalPageNumber={totalPageNumber}
                currentPage={currentPage}
                paginate={handleChangeCurrenPage}
                handleNextBtn={handleNextBtn}
                handlePrevBtn={handlePrevBtn}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default UserValidate;
