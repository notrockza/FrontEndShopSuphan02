import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { fetchProductStatisticsAsync, fetchSalesCommunityAsync, fetchSalesStatisticsAsync } from "../../Stone/reportSlice";
import { Community } from "../../Model/Report";
import agent from "../../API/Agent";


const useReport = () => {
    const dispatch = useAppDispatch()


  

    const { productStatistics,productStatisticsLoaded,salesStatistics,salesStatisticsLoaded ,salesCommunity,salesCommunityLoaded} = useAppSelector((state) => state.report);
  
      useEffect(()=>{
        if(!productStatisticsLoaded)dispatch(fetchProductStatisticsAsync())
      },[productStatistics])
      
      useEffect(()=>{
        if(!salesStatisticsLoaded)dispatch(fetchSalesStatisticsAsync())
      },[salesStatistics])

      useEffect(()=>{
        if(!salesCommunityLoaded)dispatch(fetchSalesCommunityAsync())
      },[salesCommunity])

      
    
    return {
        productStatistics,
        salesStatistics,
        salesCommunity

    };
   
  }
  
  export default useReport