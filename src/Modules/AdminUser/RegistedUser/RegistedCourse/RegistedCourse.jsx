import React, { useState } from "react";
// hooks
import Pagination from "../../../../Components/Paginate/Pagination";
// fetchet
import CourseAPI from "../../../../services/CourseAPI";
// swal
import swal from "sweetalert";

const RegistedCourse = ({
  registedCourses,
  userAccount,
  fetchRegistedCourses,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 2; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = registedCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(registedCourses.length / itemPerPage); // tổng số trang

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

  // func hủy khóa học
  const handleDeleteCourseValidate = (maKhoaHoc) => {
    swal({
      text: "bạn muốn hủy khóa học này ???",
      buttons: true,
      icon: "warning",
    }).then(async (response) => {
      if (response) {
        try {
          await CourseAPI.unRegisterCourse({
            taiKhoan: userAccount,
            maKhoaHoc,
          });
          // nếu đã chọn thì thực hiện request api hàm fetchRegistedCourses đề cập nhật lại danh sách khóa học chờ ghi danh
          fetchRegistedCourses();
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
    <div className="container" style={{ borderTop: "2px solid #bbb" }}>
      {registedCourses.length === 0 ? (
        <h4>Không có khóa học đã ghi danh</h4>
      ) : (
        <>
          {" "}
          <h4>Khóa học đã ghi danh</h4>
          <div className="validate-course__list my-2 table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khóa học</th>
                  <th>Chờ xác thực</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((item, index) => (
                  <tr key={item.maKhoaHoc}>
                    <td>{index + 1}</td>
                    <td>{item.tenKhoaHoc}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteCourseValidate(item.maKhoaHoc)
                        }
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {registedCourses.length > itemPerPage ? (
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

export default RegistedCourse;
