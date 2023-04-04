import { useEffect } from "react";
import { fetchCartAsync } from "../../Stone/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";

const useCart = () => {
  const dispatch = useAppDispatch()
  const accountid = JSON.parse(localStorage.getItem("account")!)
  const { account } = useAppSelector(state => state.account);
    const { carts, status } = useAppSelector(state => state.crat);
    const subtotal = carts?.reduce((sum, item) => sum + (item.amountProduct * item.product.price), 0) ?? 0;
    const itemCount = carts?.reduce((sum, item) => sum + item.amountProduct, 0) ?? 0;
    const deliveryFree = subtotal > 10000 ? 0 : 50;
    const priceTotal = carts?.reduce((curNumber, item) => {
      return curNumber + item.amountProduct * item.product.price;
    }, 0);
    useEffect(() => {
      if(!account)dispatch(fetchCartAsync(accountid?.id));
     }, [dispatch,itemCount]);


  return {
    carts ,
    status ,
    deliveryFree ,
    subtotal ,
    itemCount,
    priceTotal,
    fetchCartAsync
  };
}

export default useCart