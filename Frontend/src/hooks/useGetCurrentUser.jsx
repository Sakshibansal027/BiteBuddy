import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/user.slice";
import serverUrl from "../../config";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );

        dispatch(setUserData(res.data));

      } catch (error) {
        console.log("USER ERROR:", error.response?.data);
        dispatch(setUserData(null));

      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;