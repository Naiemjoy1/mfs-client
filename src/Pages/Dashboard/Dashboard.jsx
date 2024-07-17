import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import useRole from "../../Components/Hooks/useRole";
import useUsers from "../../Components/Hooks/useUsers";

const Dashboard = () => {
  const { user } = useAuth();
  const [userRole] = useRole();
  const { users } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);

  return (
    <div className="bg-[#b5c2ca] min-h-[calc(100vh-246px)] px-5 lg:px-0">
      <div className="container mx-auto py-12 lg:flex space-y-4 lg:space-y-0 gap-4">
        <div className="lg:w-1/4 bg-[#eff3f4] px-10 py-6 rounded-xl flex flex-col justify-between gap-5">
          <section>
            <p className="text-center uppercase font-bold">MFS Dashboard</p>
            <div className="divider"></div>
          </section>
          <section>
            <ul className="menu text-lg gap-4">
              <NavLink to="/dashboard/profile">
                <li>Profile</li>
              </NavLink>
              {userRole === "admin" && (
                <NavLink to="/dashboard/management">
                  <li>Users</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cashin">
                  <li>Cash In</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cash-out-request">
                  <li>Cash Out Request</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/sendmoney">
                  <li>Send Money</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/cashout">
                  <li>Cash Out</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/cash-in-request">
                  <li>Cash In Request</li>
                </NavLink>
              )}
              <NavLink to="/dashboard/history">
                <li>History</li>
              </NavLink>
            </ul>
          </section>
          <section className="flex flex-col items-center text-center">
            <div className="divider"></div>
            <div className="avatar online">
              <div className="w-14 rounded-full">
                <img
                  src={
                    currentUser?.profileImage ||
                    "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <p>{currentUser?.name}</p>
          </section>
        </div>
        <div className="lg:w-3/4 bg-white px-10 py-6 rounded-xl">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
