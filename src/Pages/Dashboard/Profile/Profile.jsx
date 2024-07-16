import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const Profile = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  console.log("currentUser", currentUser);

  return (
    <div>
      <div className="avatar online">
        <div className="w-24 rounded-full ring-4 ring-primary">
          <img src={user?.profileImage} />
        </div>
      </div>
      <p>Name: {user?.name}</p>
      <p>Mobile: {user?.mobile}</p>
      <p>Email: {user?.email}</p>
      <p>Balance: {currentUser?.balance}</p>
    </div>
  );
};

export default Profile;
