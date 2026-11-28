import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import serverUrl from "../../config";

function useGetItemsByCity() {
  const dispatch = useDispatch();
    const {currentCity}=useSelector(state=>state.user)
  useEffect(() => {
    if (!currentCity) return;
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`, {
          withCredentials: true
        });

        dispatch(setitemsInMyCity(res.data));
        console.log(res.data)
      } catch (error) {
       console.log(error)
      } 
    };

    fetchItems ();
  }, [currentCity]);
}

export default useGetItemsByCity;