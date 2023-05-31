export interface SalesStatistics {
    totalPrice: number;
    sales:      Sale[];
}

export interface Sale {
    percent:  number;
    price:    number;
    fullTime: Date;
    day:      number;
    month:    number;
    year:     number;
}

export interface ProductStatistics {
    product:   Product;
    numPercen: number;
    amount:    number;
}

export interface Product {
    id:                number;
    name:              string;
    price:             number;
    stock:             number;
    detail:            string;
    image:             string;
    categoryProductID: number;
    categoryProduct:   null;
    communityGroupID:  number;
    communityGroup:    null;
    levelRarityID:     number;
    levelRarity:       null;
}


export interface Community {
    totalPrice: number;
    sales:      Sale[];
}

export interface Sale {
    percent:       number;
    price:         number;
    communityId:   number;
    communityName: string;
}
