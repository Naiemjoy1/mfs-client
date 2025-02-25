import { useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";

const Profile = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  const isOnline = currentUser?.status === "active";
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

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
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">{currentUser?.name}</p>
          <p>Mobile: {currentUser?.mobile}</p>
          <p>Email: {currentUser?.email}</p>
          <p
            onClick={toggleBalanceVisibility}
            className="cursor-pointer font-bold text-lg"
          >
            Balance:
            <span
              className={`ml-2 ${isBalanceVisible ? "text-white" : "blur-sm"}`}
            >
              {isBalanceVisible ? currentUser?.balance : "******"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
