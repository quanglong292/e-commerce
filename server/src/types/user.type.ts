type Token = {
    token: string,
}

interface IUser {
    id: string,
    userName: string,
    password: string,
    info: {
        name: string,
        phone: string,
        avatar: string,
        birthDate: Date,
        mail: string,
    },
    carts: string[],
    wishs: string[],
    orderHistory: string[],
}

export {Token, IUser}