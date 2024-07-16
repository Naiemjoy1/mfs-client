import { useAuth } from "../../Components/AuthProvider/AuthProvider";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>{user?.email}</p>
      <p>{user?.mobile}</p>
      <p>{user?._id}</p>
      <p>{user?.pin}</p>
      <p>{user?.balance}</p>
      <p>{user?.status}</p>
      <img src={user?.profileImage} alt="" />
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
