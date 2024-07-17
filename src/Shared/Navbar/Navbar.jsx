import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import useUsers from "../../Components/Hooks/useUsers";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Redirect to home page after successful logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const { users } = useUsers();
  const currentUser = users.find((u) => u.email === user?.email); // Using optional chaining here

  return (
    <div className="bg-red-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          {/* Your existing navigation items */}
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* Your existing navigation items */}
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-hover dropdown-end relative">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover-dropdown"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      currentUser?.profileImage ||
                      "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                    }
                    alt=""
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 absolute right-0 w-52 shadow bg-base-100 rounded-box z-[10] hover-dropdown-content">
                <li>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/dashboard/profile">Dashboard</Link>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-ghost"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary btn-sm text-white">
                  Log In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
