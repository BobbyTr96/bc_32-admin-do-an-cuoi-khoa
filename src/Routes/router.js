import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout/RootLayout";
import AdminCourse from "../Modules/AdminCourse";
import EditCourse from "../Modules/AdminCourse/EditCourse";
import AdminUser from "../Modules/AdminUser/AdminUser";
import EditUser from "../Modules/AdminUser/EditUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      //home page /  manage user page
      { index: true, element: <AdminUser /> },
      // edit user page
      { path: "/quanLyNguoiDung", element: <EditUser /> },
      //  manage course page
      { path: "/quanLyKhoaHoc", element: <AdminCourse /> },
      // edit course page
      { path: "/quanLyKhoaHoc/edit", element: <EditCourse /> },
      // add course page
      { path: "/quanLyKhoaHoc/add", element: <EditCourse /> },
    ],
  },
]);

export default router;
