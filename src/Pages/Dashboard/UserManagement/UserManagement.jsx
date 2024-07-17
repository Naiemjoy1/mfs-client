import Swal from "sweetalert2";
import useUsers from "../../../Components/Hooks/useUsers";
import { FaUserLargeSlash } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const UserManagement = () => {
  const { users, refetchUsers, loading } = useUsers();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetchUsers();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the user.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleChangeStatus = (user, status) => {
    axiosSecure
      .patch(`/users/status/${user.email}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetchUsers();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `User status changed to ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user status.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error changing status:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
  };

  const handleRoleChange = (user, userType) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`, { userType })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetchUsers();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name}'s role changed to ${userType}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user's role.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error changing role:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Details</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user?.profileImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user?.name}
                      <br />
                      {user?.email}
                      <br />
                      {user?.mobile}
                    </td>
                    <td>
                      <select
                        className="select select-bordered max-w-xs text-black"
                        value={user.userType}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                      </select>
                    </td>
                    <td>
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleChangeStatus(user, "block")}
                          className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-xs"
                        >
                          <FaUserLargeSlash />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleChangeStatus(user, "active")}
                          className="btn bg-green-500 hover:bg-green-600 text-white btn-xs"
                        >
                          <IoMdCheckmarkCircle />
                        </button>
                      )}
                    </td>
                    <td>
                      {/* <button
                        onClick={() => handleDelete(user)}
                        className="btn bg-red-500 hover:bg-red-600 text-white btn-xs"
                      >
                        <MdDelete />
                      </button> */}
                      {user.userType !== "admin" && (
                        <div>
                          <button
                            onClick={() => handleDelete(user)}
                            className="btn bg-red-500 hover:bg-red-600 text-white btn-xs"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
