import Comunity, { ThreadCommentModel } from "@/models/comunity"
import { IProductComment, IThreadComment } from "@/types/community.type"
import generateId from "@/utils/helpers/generateId"
import useDate from "@/utils/helpers/useDate"

function validateBody(body: any = {}, type: "comment" | "thread") {
    if (type === "comment") {
        const { userId, productId, content } = body
        if (!userId || !productId || !content) throw "Invalid comment body!"

        return { ...body, id: generateId(), date: useDate().getCurrent(), like: 0, dislike: 0, images: body.images ?? [], videoUrl: body.videoUrl ?? "" }
    }

    if (type === "thread") {
        const { userId, parentId, content } = body
        if (!userId || !parentId || !content) throw "Invalid thread comment body!"

        return { ...body, id: generateId(), date: useDate().getCurrent(), like: 0, dislike: 0}
    }
}

export const handleCreateComment = async (body: any): Promise<IProductComment> => {
    const data: any = await Comunity.create(validateBody(body, "comment"))

    return data
}

export const handleCreateThreadComment = async (body: any): Promise<IThreadComment> => {
    const data: any = await ThreadCommentModel.create(validateBody(body, "thread"))

    return data
}

// export default