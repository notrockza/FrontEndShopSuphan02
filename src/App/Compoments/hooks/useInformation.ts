import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";

import { useParams } from 'react-router-dom';
import { GetReviewProduct } from "../../Stone/ReviewSlice";
import { GetInformationAll, GetInformationDetail } from "../../Stone/InformationSlice";

const useInformation = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: any }>();
    const { information , informationloaded ,informationDetail,informationDetailloaded } = useAppSelector((state) => state.information);
  
      useEffect(()=>{
        if(!informationloaded)dispatch(GetInformationAll())
      },[id,information,dispatch])

      useEffect(()=>{
        if(!informationDetailloaded)dispatch(GetInformationDetail(id))
      },[informationDetail,dispatch])
      

    
    return {
        information,
        informationloaded,
        informationDetail
    };
   
  }
  
  export default useInformation