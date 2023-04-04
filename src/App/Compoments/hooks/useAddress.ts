import { useEffect } from "react";
import { addressSelectors, GetAddressAll } from "../../Stone/addressSilce";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";


const useAddress = () => {
   
    //const { account } = useAppSelector(state => state.account);
    const accountid = JSON.parse(localStorage.getItem("account")!)
    const { addressloaded, address } = useAppSelector((state) => state.address);
    const addresses = useAppSelector(addressSelectors.selectAll);
    const dispatch = useAppDispatch()

    useEffect(()=>{
      if(!addressloaded)dispatch(GetAddressAll(accountid.id))
      if(!address)dispatch(GetAddressAll(accountid.id))
  
    },[dispatch])
    
    return {
      addresses: addresses
    };
   
  }
  
  export default useAddress