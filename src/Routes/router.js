import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout/RootLayout";
import AdminUser from "../Modules/AdminUser/AdminUser";
import EditUser from "../Modules/AdminUser/EditUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <AdminUser /> },
    { path:'/quanLyNguoiDung', element: <EditUser /> }],
  },
]);

export default router;
