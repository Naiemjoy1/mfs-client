import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const Registration = () => {
  const axios = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/users", data);
      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">PIN</span>
          </label>
          <input
            type="number"
            name="pin"
            placeholder="PIN"
            className="input input-bordered"
            {...register("pin", { required: true })}
          />
          {errors.pin && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile</span>
          </label>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile"
            className="input input-bordered"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
