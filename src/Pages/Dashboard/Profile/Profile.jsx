import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const Profile = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  const isOnline = currentUser?.status === "active";

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full bg-primary text-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-24 rounded-full ring-4 ring-white">
              <img
                src={currentUser?.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center text-xl font-bold">{currentUser?.name}</p>
          <p className="text-center">Mobile: {currentUser?.mobile}</p>
          <p className="text-center">Email: {currentUser?.email}</p>
          <p className="text-center">Balance: {currentUser?.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
