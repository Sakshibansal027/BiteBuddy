import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setMyOrders } from "../redux/user.slice.js";
import serverUrl from "../../config";
import { useSelector } from "react-redux";

function useGetMyOrders() {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/order/my-orders`, {
                    withCredentials: true
                });
                console.log(res.data)
                dispatch(setMyOrders(res.data));
            } catch (error) {
                dispatch(setMyOrders(null));
            } 
        };

        fetchOrder();
    }, [userData]);
}
export default useGetMyOrders;