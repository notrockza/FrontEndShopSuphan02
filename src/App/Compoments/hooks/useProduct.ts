import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import { GetProduct, GetProductDetail, resetDetailProduct } from "../../Stone/productSlice";
import { GetCategoryProduct } from "../../Stone/CategorySilce";
import { GetCommunityGroup } from "../../Stone/CommunityGroupSilce";
import { GetLevelRaritys } from "../../Stone/LevelRaritySilce";


const useProduct = () => {
   
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch()
    const { productsLoaded, products } = useAppSelector((state) => state.product);
    const { productsdetailLoaded, detailProduct } = useAppSelector((state) => state.product);
    const { CommunityGroups } = useAppSelector((state) => state.communitygroup);
    const { CategoryProductsloaded , CategoryProducts } = useAppSelector((state) => state.categoryproduct);
    const { LevelRaritys } = useAppSelector((state) => state.LevelRarity);

    useEffect(() => {
        if (!productsLoaded) dispatch(GetProduct());
      }, [productsLoaded, dispatch]);

      useEffect(()=>{
        if(!productsdetailLoaded)dispatch(GetProductDetail(id))
        return()=>{ dispatch(resetDetailProduct())}
      },[detailProduct,dispatch])

      useEffect(() => {
        if (!CategoryProductsloaded) dispatch(GetCategoryProduct());
        if(!CommunityGroups)dispatch(GetCommunityGroup());
        if(!LevelRaritys)dispatch(GetLevelRaritys());
      }, [CategoryProductsloaded,dispatch]);
      
    
    return {
        products,
        productsLoaded,
        detailProduct,
        productsdetailLoaded,
        CommunityGroups,
        CategoryProducts,
        LevelRaritys
    };
   
  }
  
  export default useProduct