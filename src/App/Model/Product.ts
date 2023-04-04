export interface Product {
    id: number;
    name: string;
    image: string;
    stock: number;
    price: string;
    category: CategoryName;
    communitygroup: CommunityGroupName;
    levelrarity: LevelRarityName;
    detail?: string;
    categoryName: string;
    communityGroupName: string;
    levelRarityName: string;
    categoryProductID:  number;
    communityGroupID:   number;
    levelRarityID:      number;
    textHistory: string;
}



export interface CategoryName {
    id: number;
    name: string;
  
}

export interface CommunityGroupName {
    id: number;
    communityhroupName: string;
    district: string;
    subdistrict: string;
}

export interface LevelRarityName{
    id: number;
    levelrarityName: string;
    date: Date;

}

export interface ProductParams {
    // orderBy: string;
    // types: string[];
    // brands: string[];
    category: string;
    pageNumber: number;
    pageSize: number;
    rangePriceStart: number;
    rangePriceEnd: number;
    searchTerm?: string;
    accountID?:string;
}

export interface ImageProduct {
    id:        string;
    image:     string;
    productID: number;
}
