interface Response {
    token: string
    user: {
        name: string,
        email: string
    }
}

export function signIn(): Promise<Response>{
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve({
                token: 'ioefbjoifnfjn',
                user: {
                    name: 'Rodrigo',
                    email: 'insane@gmail.com',
                }
            })
        }, 2000)
    })
}