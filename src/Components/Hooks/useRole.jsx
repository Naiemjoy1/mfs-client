import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/${user.email}`)
        .then((response) => {
          setUserType(response.data.userType);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return [userType, loading];
};

export default useRole;
