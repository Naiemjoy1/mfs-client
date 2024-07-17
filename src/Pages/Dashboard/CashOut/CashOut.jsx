import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/useAuth";
import useUsers from "../../../Components/Hooks/useUsers";
import Swal from "sweetalert2";
import axios from "axios";
import useStatus from "../../../Components/Hooks/useStatus";
import Modal from "../CashOutRequest/Modal";

const CashOut = () => {
  const { user } = useAuth();
  const { users, refetchUsers } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  const [userStatus] = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [feeAmount, setFeeAmount] = useState(0); // State to store fee amount

  const validateReceiver = (value) => {
    if (!value) return "This field is required";
    if (!/^\d{10}$/.test(value) && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid input. Please enter a 10-digit number or valid email";
    }
    return true;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (currentUser?.userType !== "user") {
      Swal.fire({
        title: "Error!",
        text: "Only users can cash out.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        html: `You are sending <b>${
          data.amount
        }</b> with a fee of <b>${feeAmount.toFixed(
          2
        )}</b>.<br>Confirm this transaction to <b>${
          data.receiverIdentifier
        }</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!",
      });

      if (confirmResult.isConfirmed) {
        const response = await axios.post("http://localhost:3000/cash-out", {
          senderEmail: user.email,
          receiverIdentifier: data.receiverIdentifier,
          amount: data.amount,
          pin: data.pin,
        });

        Swal.fire({
          title: "Success!",
          text: `${
            response.data.message
          }. Fee deducted: ${response.data.fee.toFixed(2)}`,
          icon: "success",
        });
        reset();
        refetchUsers();
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

  const handleAmountChange = (e) => {
    const numericAmount = parseFloat(e.target.value);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const fee = numericAmount * 0.015; // Calculate fee
      setFeeAmount(fee); // Update fee amount state
    } else {
      setFeeAmount(0); // Reset fee amount if amount is invalid
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Current Balance: {currentUser?.balance}</h2>
        <Modal></Modal>
      </div>
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
              {...register("amount", { required: true, min: 50 })}
              onChange={handleAmountChange}
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

export default CashOut;
