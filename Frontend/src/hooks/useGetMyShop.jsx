import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/user.slice.js";
import { setmyShopData } from "../redux/owner.slice.js";
import serverUrl from "../../config";
import { useSelector } from "react-redux";

function useGetMyShop() {
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.user);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
                    withCredentials: true
                });

                dispatch(setmyShopData(res.data));
            } catch (error) {
                dispatch(setmyShopData(null));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchShop();
    }, [userData]);
}

export default useGetMyShop;