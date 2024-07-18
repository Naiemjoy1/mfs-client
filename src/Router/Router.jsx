import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import SendMoney from "../Pages/Dashboard/SendMoney/SendMoney";
import CashIn from "../Pages/Dashboard/CashIn/CashIn";
import CashOut from "../Pages/Dashboard/CashOut/CashOut";
import History from "../Pages/Dashboard/History/History";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import CashInRequest from "../Pages/Dashboard/CashInRequest/CashInRequest";
import CashOutRequest from "../Pages/Dashboard/CashOutRequest/CashOutRequest";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import DashboardStat from "../Pages/Dashboard/DashboardStat/DashboardStat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashboardStat></DashboardStat>,
          },
          {
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/sendmoney",
            element: <SendMoney></SendMoney>,
          },
          {
            path: "/dashboard/cashin",
            element: (
              <AgentRoute>
                <CashIn></CashIn>
              </AgentRoute>
            ),
          },
          {
            path: "/dashboard/cashout",
            element: <CashOut></CashOut>,
          },
          {
            path: "/dashboard/history",
            element: <History></History>,
          },
          {
            path: "/dashboard/management",
            element: (
              <AdminRoute>
                <UserManagement></UserManagement>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/cash-in-request",
            element: <CashInRequest></CashInRequest>,
          },
          {
            path: "/dashboard/cash-out-request",
            element: (
              <AgentRoute>
                <CashOutRequest></CashOutRequest>
              </AgentRoute>
            ),
          },
        ],
      },
    ],
  },
]);
