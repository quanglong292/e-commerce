import { IFilterOptionKeys, IFilterOptions } from "@/types/product.type"
// import { Request } from "express"
import CategoryGroupModel from "@/models/categoryGroup";
import Category from "@/models/category";

export function productServices() {
    const generateFilterOptions = async (options: IFilterOptions): Promise<any>  => {
        const promises = Object.entries(options).map(([key, val]: [string, string]) => {            
            if (key === IFilterOptionKeys.category && val) return Category.find()
            if (key === IFilterOptionKeys.categoryGroup && val) return CategoryGroupModel.find()

            return 
        }).filter(i => Boolean(i))

        const data: any[] = await Promise.all(promises).then((values) => {
            return values
          })

        const foundOptions = {}

        // Object.keys(options).forEach(key => {
        //     const foundId = data.find(i => i.name.toLowerCase() === options[key])
            
        // })
        
        
        return data
    }

    return {generateFilterOptions}
}


function capFirstLetter(string: string): string {
    string.slice(0, 1)

    return string
}