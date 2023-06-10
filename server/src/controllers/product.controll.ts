import CategoryModel from "@/models/category"
import ProductModel from "@/models/product";
import SaleModel from "@/models/sale";
import { cloneDeep, uniq } from "lodash"

export const findProductGroup = async (category) => {
    const group = await CategoryModel.find({ id: category }) ?? []

    return uniq(group.map(i => i.groups)?.flat())
}

export const handleGetProduct = async (query) => {
    console.log({ query });
    const isGetSaleProducts = query?.group === "761fcea4-58b4-4ce9-a4a5-fd5239228047"
    const saleData = await SaleModel.find()
    const productData = await ProductModel.find(isGetSaleProducts ? { id: uniq(saleData.map(i => i.products).flat()) } : query)

    return productData.map(i => {
        const item: any = cloneDeep(i.toJSON())
        const saleInfo: any = saleData.find(j => j.products.includes(item.id)) ?? { value: 0 }
        console.log({ saleInfo });


        item.saleInfo = { ...saleInfo?._doc }
        item.finalPrice = item.price - (item.price * Number(saleInfo.value) / 100)

        return item
    })
}