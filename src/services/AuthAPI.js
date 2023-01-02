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

  // api delete user
  deleteUser: (taiKhoan) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: taiKhoan,
      },
    });
  },

  editUser: (payload) => {
    return fetcher.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...payload,
      maNhom:"GP01"
    });
  },

  addUser:(payload)=>{
    return fetcher.post("QuanLyNguoiDung/ThemNguoiDung", {
      ...payload,
      maNhom:"GP01"
    });
  }

  // api tìm kiếm ng dùng
  // searchUser: (userName) => {
  //   return fetcher.get("QuanLyNguoiDung/TimKiemNguoiDung", {
  //     params: {
  //       tuKhoa: userName,
  //     },
  //   });
  // },
};

export default AuthAPI;
