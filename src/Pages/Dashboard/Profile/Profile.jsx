import useAuth from "../../../Components/Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
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
      <p>Balance: {user?.balance}</p>
    </div>
  );
};

export default Profile;
