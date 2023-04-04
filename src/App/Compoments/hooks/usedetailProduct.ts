import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { fetchImageProductsAsync, resetImageProduct } from "../../Stone/detailProductSlice";
import { useParams } from 'react-router-dom';

const usedetailProduct = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: any }>();
    const { imageProducts, imageProductLoaded } = useAppSelector(state => state.detailProduct);
   
    useEffect(() => {
        if (!imageProductLoaded)dispatch(fetchImageProductsAsync(id));
         return () => {
           if (imageProducts) dispatch(resetImageProduct());
         };
 
       }, [imageProductLoaded, dispatch,id,imageProducts]);

    
    return {
        imageProducts,
        imageProductLoaded,
    };
   
  }
  
  export default usedetailProduct