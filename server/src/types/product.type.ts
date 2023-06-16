interface IFilterOptions {
    search: String,
    category: String,
    categoryGroup: String,
    brand: String,
    sortBy: "highToLow" | "lowToHigh",
}

interface IArrayValue {
    name: string,
    value: string | number
}

interface IProduct {
    id: String,
    name: String,
    shortName: String,
    group: string[],
    category: string[],
    brand: String,
    price: Number,
    available: Boolean,
    stocks: IArrayValue[],
    size: string[],
    subType?: any[],
    detailImages: IArrayValue[],
    bannerImage: String,
    description: String,
    fields: String
}

const IFilterOptionKeys = {
    search: "search",
    category: "category",
    categoryGroup: "categoryGroup",
    brand: "brand",
    sortBy: "sortBy",
}

// interface IGetProductRequest 

export { IFilterOptions, IProduct, IFilterOptionKeys }