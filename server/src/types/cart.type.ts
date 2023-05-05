interface ICart {
    id: string,
    creator: string,
    createDate: string,
    totalPrice: number,
    products: string[] | []
}

export {ICart}