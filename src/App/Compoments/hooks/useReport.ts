import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { fetchProductStatisticsAsync, fetchSalesStatisticsAsync } from "../../Stone/reportSlice";


const useReport = () => {
    const dispatch = useAppDispatch()

    const { productStatistics,productStatisticsLoaded,salesStatistics,salesStatisticsLoaded } = useAppSelector((state) => state.report);
  
      useEffect(()=>{
        if(!productStatisticsLoaded)dispatch(fetchProductStatisticsAsync())
      },[productStatistics])
      
      useEffect(()=>{
        if(!salesStatisticsLoaded)dispatch(fetchSalesStatisticsAsync())
      },[salesStatistics])

    
    return {
        productStatistics,
        salesStatistics
    };
   
  }
  
  export default useReport