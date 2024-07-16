import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const Profile = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const currentUser = users.find((users) => users.email === user.email);

  return (
    <div>
      <div className="avatar online">
        <div className="w-24 rounded-full ring-4 ring-primary">
          <img src={currentUser?.profileImage} />
        </div>
      </div>
      <p>Name: {currentUser?.name}</p>
      <p>Mobile: {currentUser?.mobile}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Balance: {currentUser?.balance}</p>
    </div>
  );
};

export default Profile;
