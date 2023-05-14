interface IThreadComment {
    id: string,
    parentId: string,
    userId: string,
    content: string,
    like: number,
    disLike: number,
}

interface IProductComment {
    id: string,
    userId: string,
    productId: string,
    content: string,
    rating: number,
    images: string[],
    videoUrl: string,
    like: number,
    disLike: number,
    date: string,
}

export {IThreadComment, IProductComment}