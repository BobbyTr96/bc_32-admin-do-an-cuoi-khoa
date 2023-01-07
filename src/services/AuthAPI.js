import fetcher from "./fetcher";

const AuthAPI = {
  // api login
  userSignin: (value) => {
    return fetcher.post("QuanLyNguoiDung/DangNhap", value);
  },

  // api lấy danh sách user
  getUserList: (searchTerm) => {
    return fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        tuKhoa: searchTerm,
      },
    });
  },

  // api lấy danh sách ng dùng chưa ghi danh khóa học
  getUsersUnregistedCourse: (maKhoaHoc) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", {
      maKhoaHoc,
    });
  },

  // api lấy danh sách ng dùng đã ghi danh khóa học
  getUserAttendedCourses: (maKhoaHoc) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", {
      maKhoaHoc,
    });
  },

  // api lấy arr user chờ xác thực
  getUserWaitForValidate: (maKhoaHoc) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", {
      maKhoaHoc,
    });
  },

  // api delete user
  deleteUser: (taiKhoan) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: taiKhoan,
      },
    });
  },

  // edit user
  editUser: (payload) => {
    return fetcher.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...payload,
      maNhom: "GP01",
    });
  },

  // add user
  addUser: (payload) => {
    return fetcher.post("QuanLyNguoiDung/ThemNguoiDung", {
      ...payload,
      maNhom: "GP01",
    });
  },
};

export default AuthAPI;
