import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://mobile-financial-service-8e757.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
