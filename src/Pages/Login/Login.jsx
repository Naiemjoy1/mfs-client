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
    <div>
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
            <span className="label-text">Pin</span>
          </label>
          <input
            type="number"
            name="pin"
            placeholder="password"
            className="input input-bordered"
            {...register("pin", { required: true })}
          />
          {errors.pin && <span>This field is required</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
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
