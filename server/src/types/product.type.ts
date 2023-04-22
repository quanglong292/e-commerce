interface IFilterOptions {
    search: String,
    category: String,
    categoryGroup: String,
    brand: String,
    sortBy: String,
}

const IFilterOptionKeys = {
    search: "search",
    category: "category",
    categoryGroup: "categoryGroup",
    brand: "brand",
    sortBy: "sortBy",
}

// interface IGetProductRequest 

export {IFilterOptions, IFilterOptionKeys}