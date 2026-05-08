import React, { useEffect } from "react";
import serverUrl from "../../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setcurrentCity,
  setcurrentState,
  setcurrentAddress,
} from "../redux/user.slice.js";
import { setAddress, setLocation } from "../redux/map.Slice.js";

function useGetCity() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({lat:latitude,lon:longitude}))
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`,
      );
      dispatch(setcurrentCity(res?.data?.results[0].city));
      dispatch(setcurrentState(res?.data?.results[0].state ||res?.data?.results[0].city));
      dispatch(setcurrentAddress(res?.data?.results[0].address_line1 ||res?.data?.results[0].address_line2));
      dispatch(setAddress(res?.data?.results[0].address_line2))
      console.log(res.data);
    });
  }, [userData]);
}
export default useGetCity;
