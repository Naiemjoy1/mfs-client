import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";

const SendMoney = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: `You are sure send money to ${data.receiverIdentifier}`,
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

        setSuccessMessage(response.data.message);
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });
        reset(); // Reset form fields
      } else {
        Swal.fire("Cancelled", "Transaction cancelled.", "info");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
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
              placeholder="Receiver's email or mobile"
              className="input input-bordered"
              {...register("receiverIdentifier", { required: true })}
            />
            {errors.receiverIdentifier && (
              <span className="text-red-500">This field is required</span>
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
          <button
            type="submit"
            className={`btn btn-primary ${loading && "opacity-50 cursor-wait"}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Money"}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default SendMoney;
