import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useLogs = () => {
  const axiosPublic = useAxiosPublic();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/transaction-history")
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  return [logs, loading];
};

export default useLogs;
