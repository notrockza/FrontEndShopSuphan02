import { useEffect } from "react";
import { fetchAccount, setAccount } from "../../Stone/accountSlice";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { fetchConfirmOrderAccount, fetchOrderByIdAccountAsync, fetchOrderConfirm } from "../../Stone/orderSlice";


const useOrder = () => {
    const dispatch = useAppDispatch()
    const { orders ,ordersConfirm ,ordersLoaded ,ordersSucceed} = useAppSelector((state) => state.order);
    const localaccount = JSON.parse(localStorage.getItem("account")!)

  useEffect(() => {
    if (!ordersLoaded) dispatch(fetchOrderByIdAccountAsync(localaccount.id));
  }, [orders, dispatch]);

  useEffect(() => {
    if (!ordersConfirm) dispatch(fetchOrderConfirm());
  }, [orders, dispatch]);

  useEffect(() => {
    if (!ordersSucceed) dispatch(fetchConfirmOrderAccount(localaccount.id));
  }, [ordersSucceed, dispatch]);

    return {
        orders,
        ordersSucceed,
        ordersConfirm,
        ordersLoaded,
    };
   
  }
  
  export default useOrder