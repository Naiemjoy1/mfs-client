import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/login", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Response:", response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/dashboard";
      });
    } catch (error) {
      console.error("Login failed", error.response.data);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message || "An error occurred",
      });
    }
  };

  return (
    <div className="lg:w-1/3 mx-auto min-h-[calc(100vh-246px)]">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email or Mobile</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="email or mobile"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form-control">
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
          {errors.pin && errors.pin.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.pin && errors.pin.type === "minLength" && (
            <span>PIN must be exactly 5 digits long</span>
          )}
          {errors.pin && errors.pin.type === "maxLength" && (
            <span>PIN must be exactly 5 digits long</span>
          )}
          {errors.pin && errors.pin.type === "pattern" && (
            <span>PIN must contain only digits (0-9)</span>
          )}
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p>
          New Here?{" "}
          <span>
            <a className="text-primary" href="/registration">
              Registration{" "}
            </a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
