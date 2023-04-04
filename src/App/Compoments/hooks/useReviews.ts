import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";

import { useParams } from 'react-router-dom';
import { GetReviewProduct } from "../../Stone/ReviewSlice";

const useReviews = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: any }>();
    const { ReviesLoaded, Reviews } = useAppSelector((state) => state.review);
  
      useEffect(()=>{

        if(!ReviesLoaded)dispatch(GetReviewProduct(id))
      },[id,Reviews,dispatch])
      

    
    return {
        Reviews,
        ReviesLoaded
    };
   
  }
  
  export default useReviews