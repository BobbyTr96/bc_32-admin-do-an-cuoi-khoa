import fetcher from "./fetcher";

const CourseAPI = {
  getUnRegistedCourse: (value) => {
    return fetcher.post("QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", value);
  },
};

export default CourseAPI;
