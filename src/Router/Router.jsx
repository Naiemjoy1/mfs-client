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
        element: <Dashboard></Dashboard>,
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
            element: <CashIn></CashIn>,
          },
          {
            path: "cashout",
            element: <CashOut></CashOut>,
          },
          {
            path: "history",
            element: <History></History>,
          },
        ],
      },
    ],
  },
]);
