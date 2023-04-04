import { useEffect, useState } from "react";
import { GetAccountAll, fetchAccount, setAccount } from "../../Stone/accountSlice";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { User } from "../../Model/Account";
import agent from "../../API/Agent";


const useUser = () => {
    const dispatch = useAppDispatch()
   
    const { account,userLoaded } = useAppSelector((state) => state.account);   
    const localaccount = JSON.parse(localStorage.getItem("account")!)

    const [user, setUser] = useState<User[] | null>(null);

    const loadUser = async () => {
      const { data } = await agent.Account.GetAccountAll();
      setUser(data);
    }
  
    useEffect(() => {
      loadUser()
    }, []);
  
    
   

  useEffect(() => {
    if (userLoaded) dispatch(fetchAccount());
    if (!localaccount)dispatch(fetchAccount())
    //if(!accounts) dispatch(GetAccountAll())
  }, [account, dispatch]);

    return {
        account,
        localaccount,
        user
    };
   
  }
  
  export default useUser