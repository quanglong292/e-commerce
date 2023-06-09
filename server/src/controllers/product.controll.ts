import CategoryModel from "@/models/category"
import { uniq } from "lodash"

export const findProductGroup = async (category) => {
    const group = await CategoryModel.find({ id: category }) ?? []

    return uniq(group.map(i => i.groups)?.flat())
}