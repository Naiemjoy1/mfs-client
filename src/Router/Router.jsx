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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "sendmoney",
            element: <SendMoney></SendMoney>,
          },
          {
            path: "cashin",
            element: (
              <AgentRoute>
                <CashIn></CashIn>
              </AgentRoute>
            ),
          },
          {
            path: "cashout",
            element: <CashOut></CashOut>,
          },
          {
            path: "history",
            element: <History></History>,
          },
          {
            path: "management",
            element: (
              <AdminRoute>
                <UserManagement></UserManagement>
              </AdminRoute>
            ),
          },
          {
            path: "cash-in-request",
            element: <CashInRequest></CashInRequest>,
          },
          {
            path: "cash-out-request",
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
