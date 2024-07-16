import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import useUsers from "../../../Components/Hooks/useUsers";
import useStatus from "../../../Components/Hooks/useStatus";

const SendMoney = () => {
  const { user } = useAuth();
  const [userStatus] = useStatus();
  const { users, refetchUsers } = useUsers();
  const currentUser = users.find(
    (users) => users.email === user.email && users.userType === "user"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState(0);

  const validateReceiver = (value) => {
    if (!value) return "This field is required";
    if (!/^\d{10}$/.test(value) && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid input. Please enter a 10-digit number or valid email";
    }
    const receiver = users.find(
      (user) =>
        (user.email === value || user.mobile === value) &&
        user.userType === "user"
    );
    if (!receiver) {
      return "Receiver must be a user";
    }
    return true;
  };

  const calculateFee = (amount) => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 100) {
      return 5;
    }
    return 0;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: `You are sure to send money to ${data.receiverIdentifier}. Transaction fee: ${fee}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!",
      });

      if (confirmResult.isConfirmed) {
        const response = await axios.post("http://localhost:3000/send-money", {
          senderEmail: user.email,
          receiverIdentifier: data.receiverIdentifier,
          amount: data.amount,
          pin: data.pin,
        });

        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });
        reset(); // Reset form fields
        refetchUsers(); // Refetch users data
      } else {
        Swal.fire("Cancelled", "Transaction cancelled.", "info");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Current Balance: {currentUser?.balance}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="flex justify-center gap-6">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Sender</span>
            </label>
            <input
              type="text"
              name="senderEmail"
              placeholder="Sender's email"
              className="input input-bordered"
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Receiver</span>
            </label>
            <input
              type="text"
              name="receiverIdentifier"
              placeholder="Receiver's email or 10-digit number"
              className="input input-bordered"
              {...register("receiverIdentifier", {
                required: true,
                validate: validateReceiver,
              })}
            />
            {errors.receiverIdentifier && (
              <span className="text-red-500">
                {errors.receiverIdentifier.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="input input-bordered"
              {...register("amount", {
                required: true,
                min: 50,
                onChange: (e) => setFee(calculateFee(e.target.value)),
              })}
            />
            {errors.amount && (
              <span className="text-red-500">
                {errors.amount.type === "min"
                  ? "Minimum amount is 50"
                  : "This field is required"}
              </span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">PIN (5 digits)</span>
            </label>
            <input
              type="text"
              name="pin"
              placeholder="PIN"
              className="input input-bordered"
              {...register("pin", {
                required: true,
                minLength: 5,
                maxLength: 5,
                pattern: /^[0-9]*$/,
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            {errors.pin && (
              <span className="text-red-500">
                {errors.pin.type === "required"
                  ? "This field is required"
                  : errors.pin.type === "minLength" ||
                    errors.pin.type === "maxLength"
                  ? "PIN must be exactly 5 digits long"
                  : "PIN must contain only digits (0-9)"}
              </span>
            )}
          </div>
        </div>
        <div className="form-control mt-6">
          {userStatus === "active" ? (
            <button
              type="submit"
              className={`btn btn-primary ${
                loading && "opacity-50 cursor-wait"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Money"}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary opacity-50 cursor-not-allowed"
            >
              Wait for account active
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendMoney;
