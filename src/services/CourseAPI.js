import fetcher from "./fetcher";

const CourseAPI = {
  // request API lấy danh sách khóa học mà ng dùng chưa ghi danh
  getUnRegistedCourse: (payload) => {
    return fetcher.post(
      "QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh",
      payload
    );
  },

  // request API lấy danh sách khóa học của ng dùng đang chờ xét duyệt
  getValitdateCourses: (taiKhoan) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", {
      taiKhoan,
    });
  },

  // request API khóa học đã ghi danh
  getRegistedCourses: (taiKhoan) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", {
      taiKhoan,
    });
  },

  // request API lấy danh sách khóa học || tìm kiếm khóa học theo tên
  getCourses: (tenKhoaHoc) => {
    return fetcher.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        tenKhoaHoc,
      },
    });
  },

  // // request API lấy danh sách danh mục khóa học
  getCourseCatalog: () => {
    return fetcher.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  // request API ghi danh khóa học
  registerCourse: (payload) => {
    return fetcher.post("QuanLyKhoaHoc/GhiDanhKhoaHoc", payload);
  },

  // request API hủy ghi danh khóa học
  unRegisterCourse: (payload) => {
    return fetcher.post("QuanLyKhoaHoc/HuyGhiDanh", payload);
  },

  // request API xóa khóa học
  deleteCourse: (MaKhoaHoc) => {
    return fetcher.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
      params: {
        MaKhoaHoc,
      },
    });
  },

  // request API cập nhật khóa học
  editCourse: (payload) => {
    return fetcher.put("QuanLyKhoaHoc/CapNhatKhoaHoc", payload);
  },

  // request api thêm khóa học
  addCourse: (payload) => {
    return fetcher.post("QuanLyKhoaHoc/ThemKhoaHoc", payload);
  },
};

export default CourseAPI;
