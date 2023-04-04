export interface Cart {
    imageUrl: any;
    name: any;
    id:            string;
    product:       Product;
    amountProduct: number;
    imageProduct:  string;
}

export interface Product {
    id:                number;
    name:              string;
    price:             number;
    stock:             number;
    detail:            string;
    image:             string;
    categoryProductID: number;
    categoryProduct:   CategoryProduct;
    communityGroupID:  number;
    communityGroup:    null;
    levelRarityID:     number;
    levelRarity:       null;
}

export interface CategoryProduct {
    id:   number;
    name: string;
}
