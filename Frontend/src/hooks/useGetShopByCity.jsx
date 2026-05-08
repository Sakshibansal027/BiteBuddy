import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setLoading, setshopInMyCity } from "../redux/user.slice";
import serverUrl from "../../config";

function useGetShopByCity() {
  const dispatch = useDispatch();
    const {currentCity}=useSelector(state=>state.user)
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`, {
          withCredentials: true
        });

        dispatch(setshopInMyCity(res.data));
        console.log(res.data)
      } catch (error) {
       console.log(error)
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchShop ();
  }, [currentCity]);
}

export default useGetShopByCity;