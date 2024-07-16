import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Registration = () => {
  const axios = useAxiosPublic();
  const [imageFile, setImageFile] = useState(null);
  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let displayUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        displayUrl = result.data.display_url;
      }

      // Add image URL to data
      const userData = { ...data, profileImage: displayUrl };

      // Create user
      const response = await axios.post("/users", userData);
      console.log(response.data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An error occurred",
      });
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
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
        <div className="form-control w-1/2">
          <label className="label">
            <span className="label-text">User Type</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("userType", { required: true })}
          >
            <option disabled selected>
              Select User Type?
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.userType && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            name="image"
            className="file-input w-full max-w-xs"
            onChange={handleImageChange}
          />
          {errors.image && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">PIN (5 digits)</span>
          </label>
          <input
            type="number"
            name="pin"
            placeholder="PIN"
            className="input input-bordered"
            {...register("pin", {
              required: true,
              minLength: 5,
              maxLength: 5,
              pattern: /^[0-9]*$/,
            })}
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile (10 digits)</span>
          </label>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile"
            className="input input-bordered"
            {...register("mobile", {
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^[0-9]*$/,
            })}
          />
          {errors.mobile && errors.mobile.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.mobile && errors.mobile.type === "minLength" && (
            <span>Mobile number must be exactly 10 digits long</span>
          )}
          {errors.mobile && errors.mobile.type === "maxLength" && (
            <span>Mobile number must be exactly 10 digits long</span>
          )}
          {errors.mobile && errors.mobile.type === "pattern" && (
            <span>Mobile number must contain only digits (0-9)</span>
          )}
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
        <p>
          Already have an account?{" "}
          <span>
            <a className="text-primary" href="/login">
              Login{" "}
            </a>
          </span>
          Here
        </p>
      </form>
    </div>
  );
};

export default Registration;
